import pkg from './package.json';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import { terser } from "rollup-plugin-terser";

const isProd = process.env.BUILD === 'prod';
const format = process.env.FORMAT || 'umd';

const input = `src/index.ts`;
const suffix = isProd ? `.min` : '';
const suffixFormat = format !== 'umd' ? `.${format}` : '';
const file = `bin/pixi-cjk${suffixFormat}${suffix}.js`;

const plugins = [
    resolve(),
    typescript(),
    terser(),
		commonjs({extensions: ['.js', '.ts']})
];

if (isProd) {
    plugins.push(terser());
}

const compiled = (new Date()).toUTCString().replace(/GMT/g, 'UTC');

const banner = `/*!
 * ${pkg.name} - v${pkg.version}
 * Compiled ${compiled}
 *
 * pixi-cjk is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */\n`;

export default {
    banner,
    globals: {
      'pixi.js': 'PIXI'
    },
    intro: `if (typeof PIXI === 'undefined') { throw 'PixiJS is required'; }`,
    input,
    output: {
        name: `__pixiCJK`,
        file,
        format,
    },
    sourcemap: true,
    plugins
};
