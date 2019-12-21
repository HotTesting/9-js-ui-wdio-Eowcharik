require("ts-node").register({ files: true });

exports.config = {
	runner: "local",
	// Override default path ('/wd/hub') for chromedriver service.
	path: "/",
	specs: [
		// "./test/specs/**/*.ts"
		"test/specs/order.ts"
	],
	maxInstances: 20,
	capabilities: [
		{
			maxInstances: 2,
			browserName: "chrome"
		}
	],
	// Level of logging verbosity: trace | debug | info | warn | error | silent
	logLevel: "warn",
	bail: 0,
	baseUrl: process.env.SUT_URL || "http://ip-5236.sunline.net.ua:38015",
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
	beforeTest: function() {
		browser.setTimeout({ implicit: 500 });
	}
};
