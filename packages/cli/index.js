#!/usr/bin/env node

const meow = require('meow');
const collector = require('@laboon/cli/lib/collector')

const cli = meow(`
	Usage
	  $ laboon <input>

	Commands
	  clean              Removing cache on generator

	Options
	  --format, -f       File format to compile
	  --exclude, -e      Excluding file / folders
	  --source, -s       Source directory to generate (optional)
	  --destination, -d  Destination folder of docs (default .laboon)
	  --host, -h         Host of development preview
	  --port, -p         Port of development preview

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
			type: 'array',
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

collector(cli.flags)