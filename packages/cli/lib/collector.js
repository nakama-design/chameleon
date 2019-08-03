const collector = __dirname;
const project = process.cwd();

const execa = require("execa");
const glob = require("fast-glob");
const sander = require("sander");
const { log } = require("./utils");

const FLAG_NEWLINE = /\n/g;
const FLAG_COMMENTS = /(\/\*|\-{4})(.|[\r\n])*?(\*\/|\-{4})/gm;
const FLAG_ATTRIBUTES = /\@.*(?=\{)(.|[\r\n])*?\}|(\@.+|^\w.+\:.+)/gm;
const FLAG_SUB_ATTRIBUTES = /\@([^\s]+)\s(.*)/;
const RESULTS = {
  documents: [],
  schema: [],
  components: [],
  routes: []
};

module.exports = async flags => {
  // Logging
  log.log("Collecting detected files");

  // Check existing laboon.yml
  const laboon = await sander.exists(project, ".laboon.yml");

  // Set default configuration
  const config = {
    format: ["md", "js"],
    exclude: ["node_modules"],
    source: "src",
    destination: "docs",
    host: "0.0.0.0",
    port: "3456"
  };

  if (laboon) {
    // parse yaml and replace current config
  }

  if (flags) {
    // replace current config with flags
  }

  // Create glob pattern
  const globPattern = config.format.map(format => {
    return `**/*.${format}`;
  });

  // Glob possible files with pattern & ignore
  const globResult = await glob(globPattern, { ignore: config.exclude });

  log.log(
    `Founds ${globResult.length} file with format ${config.format.join(", ")}`
  );

  // Loop all files and get the content
  Promise.all(
    globResult.map(async file => {
      let result = null;

      const format = file.split(".").pop();
      const content = await sander.readFile(file, { encoding: "utf-8" });

      if (FLAG_COMMENTS.test(content)) {
        const comments = content.match(FLAG_COMMENTS);

        if (comments.length > 0) {
          const attributes = comments[0].match(FLAG_ATTRIBUTES);
          const brackets = {};

          switch (format) {
            case "js":
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
              attributes.map(attr => {
                const [key, value] = attr.split(":");

                brackets[key.trim()] = value.trim();
              });

              RESULTS["documents"].push({
                content: content.replace(FLAG_COMMENTS, "").trim(),
                ...brackets
              });

              result = content;
              break;
          }
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
      if (await !sander.exists(".laboon")) {
        await sander.mkdir(".laboon");
      }

      await sander.writeFile(
        ".laboon",
        "data.json",
        JSON.stringify(RESULTS, false, 2)
      );

      log.log("Generate content finished");
      process.exit(0);
    }
  });
};
