var nodePath = require('path'),
    root = nodePath.resolve(__dirname) + '/',
    conf = {};

// Значение "<base href=''>" в index.html
conf.BASE_URL = '';
conf.ROOT_WEB = conf.BASE_URL;

conf.DIST_DIR = root + 'dist/';
conf.SRC = root + 'src/';

module.exports = conf;
