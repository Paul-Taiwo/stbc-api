'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _winstonPapertrail = require('winston-papertrail');

var _winstonPapertrail2 = _interopRequireDefault(_winstonPapertrail);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = void 0;

if (_config2.default.env == 'test' || _config2.default.env == 'local' || _config2.default.env == 'development') {
	logger = console;
} else {
	// const papertrailTransport = new winston.transports.Papertrail({
	// 	host: config.logger.host,
	// 	port: config.logger.port,
	// });

	// logger = new winston.Logger({
	// 	transports: [papertrailTransport],
	// });
}

exports.default = logger;
//# sourceMappingURL=index.js.map