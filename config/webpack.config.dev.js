'use strict';

const baseWebpackConf = require('./webpack.config.js');

baseWebpackConf.output.filename = 'bundle-dev.js';

module.exports = baseWebpackConf;
