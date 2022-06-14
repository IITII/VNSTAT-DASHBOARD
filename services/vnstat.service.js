"use strict";

const which = require('which'),
	{ spawn } = require('child_process')
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "vnstat",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		json: {
			rest: {
				method: "GET",
				path: "/json"
			},
			async handler() {
				return await this.get_vnstat_json();
			}
		}
	},
	methods: {
		getVnstatBin() {
			return which.sync("vnstat", { nothrow: true }) || "";
		},
		async get_vnstat_json() {
			return await new Promise((resolve, reject) => {
				const vnstatBin = this.getVnstatBin();
				const opts = { 'shell': true, 'windowsHide': true }
				if (!vnstatBin) {
					return reject()
				}
				let spawnObj = spawn(vnstatBin, [" --json"], opts)
				spawnObj.stderr.on('data', e => reject(e.toString()))
				let buffer = []
				spawnObj.stdout.on('data', d => {
					buffer = buffer.concat(d)
				})
				spawnObj.once('exit', exitCode => {
					// clear object
					spawnObj = undefined
					if (exitCode === 0) {
						return resolve(JSON.parse(buffer.toString()))
					} else {
						return reject(exitCode)
					}
				})
			})
		}
	},
};
