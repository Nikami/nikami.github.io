import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
const appVersion = require('./package.json').version;

const conf = require('./variables.js');

export default {
  entry: conf.SRC + 'app/main.aot.ts',
  dest: conf.DIST_DIR + 'app.' + appVersion + '.js',
  sourceMap: false,
  format: 'iife',
  onwarn: function (warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versionsF
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }

    console.warn(warning.message);
  },
  plugins: [
    builtins(),
    nodeResolve(),
    commonjs({
      include: ['node_modules/rxjs/**',
        'node_modules/highcharts/**',
        'node_modules/angular2-highcharts/**'
      ],
      namedExports: {
        'node_modules/angular2-highcharts/index.js': ['ChartModule'],
        'node_modules/highcharts/highcharts.js': ['highcharts']
      }
    })
  ]
};
