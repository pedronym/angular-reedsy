module.exports = function(grunt) {

  grunt.initConfig({
    express: {
      dev: {
        options: {
          script: 'app.js'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['node_modules/angular/angular.min.js'],
        dest: 'public/js/angular.js',
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
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('run', ['express:dev', 'concat', 'watch']);

};