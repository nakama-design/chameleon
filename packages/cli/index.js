#!/usr/bin/env node

const meow = require('meow');
const collector = require('./lib/collector')

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

collector(cli.flags)