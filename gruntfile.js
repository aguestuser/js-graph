module.exports = function (grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    mochaTest: {
      options: {
        require: "babel-register"
      },
      unit: {
        src: ['src/test/unit/**/*.spec.js']
      },
      functional: {
        src: ['src/test/functional/**/*.spec.js']
      }
    },
    run: {
      options: {
        wait: false,
        quiet: true
      }
    },
    watch: {
      notify_hooks: {
        files: ['src/main/**/*.js', 'src/test/unit/**/*.spec.js'],
        tasks: ['mochaTest:unit'],
        options: {
          enabled: true,
          success: true,
          duration: 1
        }
      }
    }
  });

  grunt.registerTask('ut', () => grunt.task.run('mochaTest:unit'));
  grunt.registerTask('ft', () => grunt.task.run('mochaTest:functional'));
  grunt.registerTask('test', ['ut', 'ft']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
};
