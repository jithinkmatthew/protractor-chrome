let AllureReporter = require('jasmine-allure-reporter');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
// const desiredEnv = require('./environment/env.json');
// const page = require('./src/pages/basepage/BasePage');

/* This function supply desired browser configuration in conf.js file  */
// function configureCapability(capability) {
//     if(capability === 'firefox') {
//        return caps = {
//             browserName: 'firefox',
//             'moz:webdriverClick': false
//        }
//     } else if(capability === 'chrome') {
//         return caps = {
//             browserName: 'chrome',
//             'goog:chromeOptions': {
//                 args: [ "--start-maximized" ]
//             }
//        }
//     } else if(capability === 'firefox-p') {
//         return caps = {
//             browserName: 'firefox',
//             'moz:webdriverClick': false,
//             maxInstances: 10,
//             shardTestFiles: true
//        }
//     } else if(capability === 'chrome-p') {
//         return caps = {
//             browserName: 'chrome',
//             chromeOptions: {
//                 args: ['start-maximized']
//             },
//             maxInstances: 10,
//             shardTestFiles: true
//        }
//     } else if(capability === 'firefox-h') {
//         return caps = {
//             browserName: 'firefox',
//             'moz:webdriverClick': false,
//             'moz:firefoxOptions': {
//                 args: ["--headless"]
//             }
//        }
//     } else if(capability === 'chrome-h') {
//         return caps = {
//             browserName: 'chrome',
//             'goog:chromeOptions': {
//                 args: [ "--headless" ]
//             }
//         }
//     }
// }

// const cap = configureCapability(desiredEnv.browserConfig);

exports.config = {
    
    // directConnect: true,
    
    seleniumAddress: 'http://localhost:4444/wd/hub',

    /* To use async/await. */
    SELENIUM_PROMISE_MANAGER: true,

    framework: 'jasmine2',

    jasmineNodeOpts: {
        showColors: true,
        silent: true,
        defaultTimeoutInterval: 1000000,
        print: function () {
        }
    },

    /*  If true, protractor will restart the browser between each test.
     *  CAUTION: This will cause your tests to slow down drastically.
     */

    //restartBrowserBetweenTests: false,

    /* Highlight elements before interaction */    
    
    // highlightDelay: 100,


    /* Mension all the spec files here. */
    specs: [

        './src/tests/e2e/supporter-on-boarding/public-viral-link/onboarding.spec.js',

    ],

    /* All the test suits should mensioned here. */

    suites: {
        simulation: ['./src/tests/simulation/**/*spec.js']
    },
    
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [ "--start-maximized" ]
        }
    },


    onPrepare: function () {
        
        // Override the timeout for webdriver.
        browser.manage().timeouts().setScriptTimeout(60000);

        //allure report
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));

        //spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({

            suite: {
                displayNumber: true,
            },
            spec: {
                displayStacktrace: true
            },
            summary: {
                displaySuccesses: true, // display summary of all successes after execution
                displayFailed: true,    // display summary of all failures after execution
                displayPending: true,   // display summary of all pending specs after execution
            },
        }));

        /* 
         * take screenshot after each Jasmine function 'it'
         */        
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/jpeg')();
                done();
            })
        });
        
    }

};