var fs = require('fs');

// console.log(fs);

module.exports = function (grunt) {
   'use strict';
   // carga las tareas automáticamente
   require('load-grunt-tasks')(grunt);

   grunt.initConfig({
      jshint: {
         files: {
            src: ['js/**/*.js']
         }
      },
      clean: ['dist/**/*'],
      coffee: {
         dist: {
            files: {
               'dist/js/package.js': 'coffee/**/*.coffee'
            }
         },
         options: {
            sourceMap: true
         }
      },
      sass: {
         dist: {
            files: {
               'dist/css/styles.css': 'sass/**/*.scss'
            }            
         },
         options: {
            sourceMap: true
         }
      },
      uglify: {
         dist: {
            files: {
               'dist/js/package.min.js': 'dist/js/**/*.js'
            }
         },
         options: {
            sourceMap: true,
            sourceMapIn: 'dist/js/package.js.map'
         }
      },
      requirejs: {
         dist: {
            options: {
               baseUrl: 'js',
               out: 'dist/js/app.js',
               include: 'main',
               name: 'vendor/almond'
            }
         }
      },
      cssmin: {
         dist: {
            files: {
               'dist/css/styles.min.css': 'dist/css/**/*.css'
            }
         },
         options: {
            sourceMap: true
         }
      },
      copy: {
         dev: {
            files: [
               {
                  src: 'node_modules/requirejs/require.js',
                  dest: 'dist/js/vendor/require.js'
               }, {
                  expand: true,
                  src: ['js/**'],
                  dest: 'dist'
               }
            ]
         }
      },
      htmlbuild:{
         dist: {
            src: 'index.html',
            dest: 'dist/index.html',
            options: {
               // prefix: 'dist/',
               relative: true,
               scripts: {
                  'package': ['dist/js/package.min.js', 'dist/js/app.js']
               },
               styles: {
                  css: 'dist/css/styles.min.css'
               }
            }
         },
         dev:{
            src: 'index.html',
            dest: 'dist/index.html',
            options: {
               // prefix: 'dist/',
               relative: true,
               scripts: {
                  'package': 'dist/js/package.js'
               },
               styles: {
                  css: 'dist/css/styles.css'
               }
            }
         }
      },
      connect: {
         server: {
            options: {
               base:'./dist/',
               keepalive: true,
               open: true
            }
         }
      }

   });
   // las carga automáticamente load-grunt-tasks
   // grunt.loadNpmTasks('grunt-contrib-jshint');
   // grunt.loadNpmTasks('grunt-contrib-coffee');
   // grunt.loadNpmTasks('grunt-sass');
   // grunt.loadNpmTasks('grunt-contrib-uglify');
   // grunt.loadNpmTasks('grunt-contrib-clean');
   // grunt.loadNpmTasks('grunt-contrib-cssmin');
   // grunt.loadNpmTasks('grunt-html-build');

   grunt.registerTask('default', ['jshint','clean', 'coffee', 'sass', 'uglify', 'requirejs', 'cssmin', 'copy', 'htmlbuild:dev', 'connect'])

}
