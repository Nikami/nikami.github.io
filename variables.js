var nodePath = require('path'),
    root = nodePath.resolve(__dirname) + '/',
    conf = {};

// Значение "<base href=''>" в index.html
conf.BASE_URL = '';
conf.ROOT_SP = 'e:/work/ssp';
conf.ROOT_WEB = conf.ROOT_SP ? conf.ROOT_SP + conf.BASE_URL : '';


conf.DIST_DIR = root + 'dist/';
conf.MERGED = root + 'link/';
conf.AOT_DIR = root + 'aot/';

module.exports = conf;
