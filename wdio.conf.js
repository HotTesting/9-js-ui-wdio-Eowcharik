require("ts-node").register({ files: true });

exports.config = {
	runner: "local",
	// Override default path ('/wd/hub') for chromedriver service.
	path: "/",
	specs: [
		"./test/specs/**/*.ts"
		// "./test/specs/order.ts"
		// "test/specs/register.ts"
		// "test/specs/smoke.ts"
	],

	maxInstances: 10,
	capabilities: [
		{
			maxInstances: 5,
			browserName: "chrome"
		}
	],
	// Level of logging verbosity: trace | debug | info | warn | error | silent
	logLevel: "warn",
	bail: 0,
	baseUrl: "http://ip-5236.sunline.net.ua:38015",
	waitforTimeout: 10000,
	connectionRetryTimeout: 90000,
	connectionRetryCount: 3,
	services: ["chromedriver"],
	framework: "mocha",
	reporters: ["spec"],
	mochaOpts: {
		ui: "bdd",
		timeout: 60000
	},
	beforeTest: function(test, context) {
		browser.setTimeout({ implicit: 500 });
	}
};
