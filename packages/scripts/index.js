#!/usr/bin/env node

const path = require('path');
const meow = require('meow');
const rimraf = require('rimraf');
const sander = require('sander');
const shell = require('shelljs');
const collector = require('@laboon/cli/lib/collector')
const { log } = require('@laboon/cli/lib/utils')

const SOURCE_PATH = path.join(__dirname, 'node_modules', '@laboon', 'template')
const TARGET_PATH = path.join(__dirname, 'temp')
const CONFIG_PATH = path.join(TARGET_PATH, 'gridsome.config.js')
const DATA_PATH = path.join(TARGET_PATH, 'src', 'data')
const DIST_PATH = path.join(TARGET_PATH, 'dist')

const cli = meow(`
	Usage
	  $ laboon <input>

	Commands
	  clean                  Removing cache on generator

	Options
    --format, -f          File format to compile
    --exclude, -e         Excluding file / folders
    --source, -s          Source directory to generate (optional)
    --destination, -d     Destination folder of docs (default .laboon)
    --host, -h            Host of development preview
    --port, -p            Port of development preview
    --siteName, -S        Set site name for Gridsome
    --siteDescription, -D Set site description for Gridsome
    --siteUrl, -U         Set site url for Gridsome
    --pathPrefix, -P      Set path prefix for Gridsome

	Examples
	  $ laboon -f vue -f md -e node_modules -s src -d docs
`, {
	flags: {
		format: {
			type: 'array',
			alias: 'f'
		},
		exclude: {
			type: 'array',
			alias: 'e'
		},
		source: {
			type: 'string',
			alias: 's'
		},
		destination: {
			type: 'string',
			alias: 'd'
		},
		host: {
			type: 'string',
			alias: 'h'
		},
		port: {
			type: 'number',
			alias: 'p'
		},
		siteName: {
			type: 'string',
			alias: 'S'
		},
		siteDescription: {
			type: 'string',
			alias: 'D'
		},
		siteUrl: {
			type: 'string',
			alias: 'U'
		},
		pathPrefix: {
			type: 'string',
			alias: 'P'
		}
	}
});

if (cli.input[0] && cli.input[0] === 'clean') {
	if (sander.existsSync(TARGET_PATH)) {
		rimraf(TARGET_PATH, (err) => {
			if (err) throw Error(err)
		})
	}

	return
}

collector(cli.flags).then(async ({ laboon, config }) => {
	log.log('Copying interface template')

	await sander.copydir(SOURCE_PATH).to(TARGET_PATH)
	await sander.copydir(laboon).to(DATA_PATH)

	const configSource = await sander.readFile(CONFIG_PATH, { encoding: 'utf-8' })
	const configDefault = [
		`siteName: 'Laboon Docs'`
	]
	
	;[
		'siteName',
		'siteDescription',
		'siteUrl',
		'pathPrefix',
		'host',
		'port'
	].map(item => {
		if (config[item]) {
			configDefault.push(
				`${item}: '${config[item]}'`
			)
		}
	})

	const configTarget = configSource.replace('// laboon-config', configDefault.join(',\n') + ',')

	await sander.writeFile(CONFIG_PATH, configTarget)

	try {
		
		await shell.cd(TARGET_PATH)
		
		if (cli.input[0] && cli.input[0] === 'build') {
			log.log('Generating static file\n')

			await shell.exec('gridsome build')
			await sander.copydir(DIST_PATH).to(laboon)
		} else {
			log.log('Generating user interface\n')
			await shell.exec('gridsome develop')
		}

		log.log('Process exited')
	} catch (error) {
		await sander.rmdir(TARGET_PATH)

		throw error(error)
	}
})