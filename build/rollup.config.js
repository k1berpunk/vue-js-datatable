import vue from "rollup-plugin-vue";
import buble from "rollup-plugin-buble";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify-es";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const external = [
    'jquery',
    'datatables.net'
]

const config = {
  input: "src/entry.js",
  output: {
    name: "VueJsDatatable",
    exports: "named"
  },
  plugins: [
    external,
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true
      }
    }),
    buble({
      objectAssign: "Object.assign",
      transforms: {
        modules: false,
        forOf: false,
      },
    })
  ]
};

// Only minify browser (iife) version
if (argv.format === "iife") {
  config.plugins.push(uglify());
}

export default config;