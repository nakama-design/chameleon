const collector = __dirname;
const project = process.cwd();

const lstat = require("lstat");
const path = require("path");
const glob = require("fast-glob");
const yaml = require("read-yaml-promise");
const sander = require("sander");
const { log } = require("./utils");
const package = require("../package.json");

const { parser } = require('@vuese/parser')
const { Render } = require('@vuese/markdown-render')

const FLAG_NEWLINE = /\n/g;
const FLAG_COMMENTS = /(\/\*|\-{4})(.|[\r\n])*?(\*\/|\-{4})/gm;
const FLAG_ATTRIBUTES = /\@.*(?=\{)(.|[\r\n])*?\}|(\@.+|^\w.+\:.+)/gm;
const FLAG_SUB_ATTRIBUTES = /\@([^\s]+)\s(.*)/;
const FLAG_SCHEMA = /\[(flow|sequence|gantt|class|git)\]((.|[\r\n])*?)\[\/(flow|sequence|gantt|class|git)\]/gm
const RESULTS = {
  documents: [],
  components: [],
  routes: []
};

const uniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}

const merge = (target, source) => {
  return new Promise(resolve => {
    let answer = {}

    for(key in target) {
      if(answer[key] === undefined || answer[key] === null)
        answer[key] = target[key];
    }

    for(key in source) {
      if(answer[key] === undefined || answer[key] === null)
        answer[key] = source[key];
    }

    resolve(answer)
  })
}

module.exports = async flags => {
  // Logging
  log.log(`Starting Laboon ${package.version}`);

  // Check existing laboon.yml
  const laboon = await sander.exists(project, "laboon.yml");

  // Set default configuration
  let config = {
    format: ["md", "js", "vue"],
    exclude: ["node_modules"],
    source: '**',
    destination: ".laboon",
    host: "0.0.0.0",
    port: "3456"
  };

  if (laboon) {
    const laboonConfig = await yaml(path.join(project, 'laboon.yml'))

    config = await merge(laboonConfig, config)
  }

  if (flags) {
    config = await merge(flags, config)
  }

  // Create glob pattern
  let globExclude = ''
  const globPattern = []

  config.format.map(format => {
    if (Array.isArray(config.source)) {
      config.source.map(directory => {
        globPattern.push(`${directory}/**/*.${format}`);
      })
    } else {
      globPattern.push(`${config.source}/**/*.${format}`);
    }

    return globPattern
  });

  if (Array.isArray(config.exclude)) {
    globExclude = config.exclude.map(format => {
      return `**/${format}/**`;
    });
  } else {
    globExclude = `**/${config.exclude}/**`;
  }

  // Glob possible files with pattern & ignore
  const globResult = await glob(globPattern, { ignore: globExclude });

  log.log(
    `Founds ${globResult.length} file with format ${config.format.join(", ")}`
  );

  // Loop all files and get the content
  return Promise.all(
    globResult.map(async file => {
      let result = null;

      const format = file.split(".").pop();
      const content = await sander.readFile(file, { encoding: "utf-8" });

      if (FLAG_COMMENTS.test(content)) {
        const comments = content.match(FLAG_COMMENTS);

        if (comments.length > 0) {
          const attributes = comments[0].match(FLAG_ATTRIBUTES);

          if (!attributes) {
            return
          }

          const { size, ctimeMs, birthtimeMs } = await lstat(file)

          const brackets = {
            path: file,
            size: size,
            changed: ctimeMs,
            created: birthtimeMs
          };

          switch (format) {
            case "js":
            case "ts":
            case "php":
              attributes.map(attr => {
                const [, key, value] = attr
                  .replace(FLAG_NEWLINE, "#")
                  .match(FLAG_SUB_ATTRIBUTES);

                brackets[key.trim()] = value.trim();
              });

              if (brackets.parameters) {
                const subBrackets = {};

                brackets.parameters
                  .split("#")
                  .map(line => {
                    return line.replace("*", "").trim();
                  })
                  .filter(line => {
                    return !["{", "}"].includes(line);
                  })
                  .map(line => {
                    const [key, value] = line.split(":");
                    const [
                      typeData,
                      required,
                      defaultValue
                    ] = value.trim().split(" ");

                    subBrackets[key.trim()] = {
                      type: typeData,
                      required: !!required,
                      default: defaultValue
                    };

                    return;
                  });

                brackets.parameters = subBrackets;
              }

              RESULTS["routes"].push({
                ...brackets
              });

              result = attributes;
              break;

            case "md":
              const schema = {}
              const plain = content.replace(FLAG_COMMENTS, "").trim()
              const replaced = plain.replace(FLAG_SCHEMA, (match, contents, offset, input_string) => {
                const currentId = uniqueId()
                schema[currentId] = offset.trim()

                return `<div id="${currentId}" class="mermaid-chart"></div>`
              })

              attributes.map(attr => {
                const [key, value] = attr.split(":");

                brackets[key.trim()] = value.trim();
              });

              RESULTS["documents"].push({
                plain: plain,
                schema: schema,
                content: replaced,
                ...brackets
              });

              result = content;
              break;
          }
        }
      }

      if (format === 'vue') {
        try {
          const parserRes = parser(content)
          const renderRes = new Render(parserRes)
          const markdownRes = renderRes.renderMarkdown()

          if (markdownRes !== null) {
            RESULTS["components"].push({
              content: markdownRes,
              ...parserRes
            });
    
            result = content;
          }
        } catch (err) {
          throw Error(err)
        }
      }

      return result;
    })
  ).then(async filterable => {
    const results = filterable.filter(available => {
      return available !== null;
    });

    // Reject operation if collector cannot find a content
    if (results.length === 0) {
      log.log("Cannot find a valid content for laboon, process exited.");
      process.exit(0);
    }

    // Found a contents and ready to generate
    else {
      if (await !sander.exists(config.destination)) {
        await sander.mkdir(config.destination);
      }

      Object.keys(RESULTS).map(async type => {
        await sander.writeFile(
          config.destination,
          `${type}.json`,
          JSON.stringify({[type]: RESULTS[type]}, false, 2)
        );
      })

      log.log("Generate JSON source finished");

      return {
        project: project,
        laboon: `${project}/${config.destination}`,
        config: config
      }
    }
  });
};
