module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 35606:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lambdaHandler = void 0;
const aws_sdk_1 = __importDefault(__webpack_require__(23480));
const cognitoIdentityServiceProvider = new aws_sdk_1.default.CognitoIdentityServiceProvider({
    region: 'us-east-1',
    apiVersion: '2016-04-18',
});
exports.lambdaHandler = async (event, context, callback) => {
    console.log('Reject non-registered email accounts');
    const sesNotification = event.Records[0].ses;
    // console.log("SES Notification:\n", JSON.stringify(sesNotification, null, 2));
    debugger;
    const sourceEmail = sesNotification.mail.source;
    console.log(sourceEmail);
    const params = {
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: sourceEmail
    };
    try {
        const results = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
        if (results && results.UserStatus === 'CONFIRMED') {
            callback(null, null);
        }
        else {
            console.log('Non-confirmed user attempted to send email');
        }
    }
    catch (error) {
        const code = error.code;
        if (code === 'UserNotFoundException') {
            console.log('Non-user attempted to send email');
        }
        else {
            console.log('Other error');
            console.error(error);
        }
    }
    callback(null, { 'disposition': 'STOP_RULE_SET' });
};


/***/ }),

/***/ 23480:
/***/ ((module) => {

module.exports = require("aws-sdk");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(35606);
/******/ })()
;