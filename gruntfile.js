module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        files: [{
          src: ["src/**/*.ts", "!src/.baseDir.ts"],
          dest: "./javascript/"
        }],
        options: {
          module: "commonjs",
          moduleResolution: "node",
          noLib: false,
          target: "es6",
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          sourceMap: false
        }
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
      files: [{
          src: ["src/**/*.ts", "!src/.baseDir.ts", "!src/_all.d.ts"],
          dest: "./javascript/"
        }],
      options: {
        module: "commonjs",
        moduleResolution: "node",
        noLib: true,
        target: "es6",
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        sourceMap: false
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");

  grunt.registerTask("default", [
    "ts",
    "tslint"
  ]);

};