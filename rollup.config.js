// Rollup plugins
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify-es';
import postcss from 'rollup-plugin-postcss';

const pkg = require('./package');
const postcssConfig = require('./postcss.config');

const env = process.env.NODE_ENV || 'development';
const isDebug = env === 'development';

const config = {
  input: 'src/scripts/main.js',
  output: [
    {
      file: pkg.browser,
      name: pkg.name,
      moduleName: pkg.name,
      format: 'umd',
      sourcemap: true,
      // globals的值是一个对象，key表示使用的模块名称（npm模块名），
      // value表示在打包文件中引用的全局变量名，在这里将jquery模块的全局变量名设置为jQuery，重新打包
      globals: {
        jquery: 'jQuery'
      }
    }
  ],

  plugins: [
    postcss({
      plugins: postcssConfig.plugins,
      extensions: postcssConfig.extensions,
      sourcemap: true,
      extract: isDebug ? false : pkg.style // 输出路径
    }),
    json(),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    replace({
      ENV: JSON.stringify(env),
      exclude: 'node_modules/**'
    }),
    commonjs()
  ]
};

if (isDebug) {
  config.plugins.push(
    serve({
      open: true,
      verbose: false,
      contentBase: ['dist'],
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 3001
    })
  );
} else {
  config.output.push(
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  );

  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

export default config;
