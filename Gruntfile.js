
'use strict';

module.exports = function(grunt) {

  var sfInfo = grunt.file.readJSON('sfInfo.json');

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: ['tmp/**/*.js', 'components/**/*.js'],
      deploy: ['components/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      }
    },

    clean: ['tmp', 'components'],

    // Global SalesForce setup
    sf_username: sfInfo.username,
    sf_password: sfInfo.password + sfInfo.token,

    // Configuration to be run (and then tested).
    sfpush: {
      default_options: {
        options: {
          classes: ['MyHelloWorld'],
          triggers: ['DummyAccountTrigger'],
          pages: ['CV_Generator']
        }
      }
    },

    sfpull: {
      options: {
        classes: ['MyHelloWorld', 'Testfactory'],
        triggers: ['DummyAccountTrigger'],
        pages: ['CV_Generator']
      },
      default_options: {
      }
    },

    'gh-pages': {
      options: {
        components: '**',
        branch: 'src',
        repo: 'https://github.com/anehlin/sf-repo'
      },
      src: ['**']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sf-tooling');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sfpull', 'jshint']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('sf-pull', ['sfpull']);

  grunt.registerTask('sf-push', ['sfpush']);

  grunt.registerTask('deploy', ['gh-pages', 'sfpush']);

};
