/*global module:false*/

module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      timestamp: Math.floor(new Date().getTime()/1000),
      banner: '/*! */',
      jsfilename: 'boilerplate',
      cssfilename: 'boilerplate'
    },

    exec: {
      clear: {
        command: 'clear',
        stdout: true
      }
    },

    jshint: {
      options: {
        curly: true,
        strict: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      app: {
        options: {
          browser: true,
          devel: true,
          jquery: true
        },
        files: {
          src: ['src/js/src/main.js']
        }
      },
    },

    less: {
      styles: {
        files: {
          'src/css/<%= meta.cssfilename %>.css': 'src/less/app.less'
        }
      }
    },

    concat: {
      scripts: {
        src: [
          'src/js/src/jquery-1.10.2.min.js',
          'src/js/src/main.js'
        ],
        dest: 'src/js/<%= meta.jsfilename %>.js'
      }
    },

    uglify: {
      scripts: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          'dist/js/<%= meta.jsfilename %>.js': '<%= concat.scripts.dest %>'
        }
      }
    },

    cssmin: {
      compress: {
        files: {
          'dist/css/<%= meta.cssfilename %>.css': 'src/css/<%= meta.cssfilename %>.css'
        }
      }
    },

    imagemin: {
      png: {
        options: {
          optimizationLevel: 2
        },
        files: [
          {
            expand: true,
            cwd: './src/img/',
            src: ['**/*.png'],
            dest: './dist/img/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: './src/img/',
            src: ['**/*.jpg'],
            dest: './dist/img/',
            ext: '.jpg'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeEmptyAttributes: true,
          removeCommentsFromCDATA: true,
          removeRedundantAttributes: true,
          collapseBooleanAttributes: true
        },
        files: [
          {
            expand: true,
            cwd: './src/',
            src: ['**/*.html'],
            dest: './dist/',
            ext: '.html'
          }
        ]
      }
    },

    clean: {
      dist: ['./dist']
    },

    watch: {
      less: {
        files: [
          'src/less/*.less'
        ],
        tasks: [
          'less',
          'notify:dev'
        ]
      },
      javascript: {
        files: [
          'src/js/src/*.js'
        ],
        tasks: [
          'jshint',
          'concat',
          'notify:dev'
        ]
      }
    },

    notify: {
      dev: {
        options: {
          title : 'Development',
          message : 'Files ready...'
        }
      },
      dist: {
        options: {
          title : 'Production',
          message : 'Distribution built...'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', [
    'clean:dist',
    'jshint',
    'less',
    'concat',
    'uglify',
    'cssmin',
    'htmlmin',
    'imagemin',
    'notify:dist'
  ]);

};
