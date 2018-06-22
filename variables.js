let nodePath = require('path'),
    root = nodePath.resolve(__dirname) + '/',
    conf = {};

// Значение "<base href=''>" в index_template.html
conf.BASE_URL = '';
conf.ROOT_WEB = conf.BASE_URL;

conf.DIST_DIR = root + 'docs/';
conf.SRC = root + 'src/';
conf.AOT_DIR = root + 'aot/';

module.exports = conf;
