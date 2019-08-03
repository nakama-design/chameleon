#!/usr/bin/env node

const path = require('path');
const meow = require('meow');
const sander = require('sander');
const shell = require('shelljs');
const collector = require('@laboon/cli/lib/collector')
const { log } = require('@laboon/cli/lib/utils')

const cli = meow(`
	Usage
	  $ laboon <input>

	Options
	  --format, -f  Include a format
	  --exclude, -e  Include a exclude
	  --source, -s  Include a source
	  --destination, -d  Include a destination
	  --host, -h  Include a host
	  --port, -p  Include a port

	Examples
	  $ laboon -f vue -f md -e node_modules -s src -d docs -h 0.0.0.0 -p 3456
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
		}
	}
});

collector(cli.flags).then(async ({ laboon }) => {
	log.log('Creating user interface')

	const SOURCE_PATH = path.join(__dirname, 'node_modules', '@laboon', 'template')
	const TARGET_PATH = path.join(__dirname, 'temp')
	const DATA_PATH = path.join(TARGET_PATH, 'src', 'data')
	const DIST_PATH = path.join(TARGET_PATH, 'dist')

	await sander.copydir(SOURCE_PATH).to(TARGET_PATH)
	await sander.copydir(laboon).to(DATA_PATH)

	try {
		
		await shell.cd(TARGET_PATH)
		
		if (cli.input[0] && cli.input[0] === 'build') {
			log.log('Building static file\n')

			await shell.exec('gridsome build')
			await sander.copydir(DIST_PATH).to(laboon)
		} else {
			log.log('Generating gridsome project\n')
			await shell.exec('gridsome develop')
		}

		log.log('Process done')
	} catch (error) {
		await sander.rmdir(TARGET_PATH)

		throw error(error)
	}
})