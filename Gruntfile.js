
'use strict';

module.exports = function(grunt) {

  var sfInfo = grunt.file.readJSON('sfInfo.json');

  grunt.registerMultiTask('init_repo', 'Initialize a git repository in a directory.', function() {
    var dest = this.files[0].dest;

    if (!grunt.file.exists(dest)) {
      grunt.file.mkdir(dest);
    }

    else if (!grunt.file.isDir(dest)) {
      grunt.fail.warn('A source directory is needed.');
      return false;
    }

    var done = this.async();

    grunt.util.spawn({
      cmd: 'git',
      args: ['init'],
      opts: {cwd: dest}
    }, done);
  });

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
        classes: ['MyHelloWorld'],
        triggers: ['DummyAccountTrigger'],
        pages: ['CV_Generator']
      },
      default_options: {
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    init_repo: {
      main: {
        dest: 'tmp/repo'
      }
    },

    // git_deploy: {
    //   default_options: {
    //     options: {
    //        url: 'https://github.com/anehlin/sf-repo'
    //     },
    //      src: 'components/**'
    //   }
    // }

    'gh-pages': {
      options: {
        components: '**',
        branch: 'src',
        repo: 'https://github.com/anehlin/sf-repo'
      },
      src: ['**']
    }

    // buildcontrol: {
    //   options: {
    //     dir: 'components',
    //     commit: true,
    //     push: true,
    //     message: 'Built asdfa from commit aasdf on branch afsdas'
    //   },
    //   pages: {
    //     options: {
    //       remote: 'https://github.com/anehlin/sf-repo',
    //       branch: 'src'
    //     }
    //   }
    // }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-sf-tooling');
  grunt.loadNpmTasks('grunt-git-deploy');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-build-control');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sfpull', 'jshint', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('sf-pull', ['sfpull']);

  grunt.registerTask('sf-push', ['sfpush']);

  // grunt.registerTask('deploy', ['git_deploy']);

  grunt.registerTask('deploy', ['gh-pages']);

  // grunt.registerTask('deploy', ['buildcontrol']);
};
