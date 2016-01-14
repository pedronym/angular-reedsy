module.exports = function(grunt) {

  grunt.initConfig({
    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['node_modules/angular/angular.min.js','node_modules/moment/min/moment.min.js', 'node_modules/angular-ui-router/build/angular-ui-router.min.js'],
        dest: 'public/js/bundle.js',
      }
    },
    copy: {
      main: {
        files: [
          { src: 'node_modules/font-awesome/css/font-awesome.min.css', dest: 'public/css/font-awesome.css' },
          { src: 'node_modules/font-awesome/fonts/**/*', dest: 'public/fonts/', filter: 'isFile', expand:true, flatten: true}
        ]
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/css/main.css': 'sass/main.scss'
        }
      }
    },
    watch: {
      scripts: {
        files: ['sass/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
          reload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('dev', ['concat', 'copy', 'express:dev', 'watch']);
  grunt.registerTask('heroku:production', ['sass', 'concat', 'copy']);
};