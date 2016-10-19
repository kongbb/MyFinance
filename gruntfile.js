module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        tsconfig: true
        // files: [{
        //   src: ["src/**/*.ts", "!src/.baseDir.ts", "!node_modules/**"],
        //   dest: "./javascript/"
        // }],
        // options: {
        //   module: "commonjs",
        //   moduleResolution: "node",
        //   noLib: true,
        //   target: "es6",
        //   experimentalDecorators: true,
        //   emitDecoratorMetadata: true,
        //   sourceMap: true
        // },
        // default: {
        //   tsconfig: {
        //     passThrough: true
        //   }
        // }
      }
    },
    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ["src/**/*.ts"]
      }
    },
    watch: {
      ts: {
        files: ["src/**/*.ts"],
        dest: "./javascript/",
        tasks: ["ts", "tslint"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");

  grunt.registerTask("default", [
    "ts"
    //"tslint"
  ]);

};