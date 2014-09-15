module.exports = function(grunt) {

  // project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      },
      build: ['gruntfile.js', 'src/**/*.js']
    },
    concat: {
      options: {
        separator: ';'
      },
      build: {
        src: ['src/**/*.js'],
        dest: 'tmp/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        files: {
          'tmp/js/<%= pkg.name %>.min.js': ['<%= concat.build.dest %>']
        }
      }
    },
    zip: {
      // example build target for static resources
      build: {
        options: {
          base: 'tmp/'
        },
        src: ['tmp'],
        dest: 'build/staticresources/<%= pkg.name %>.resource'
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/', src: ['img/*'], dest: 'tmp/' }
        ]
      }
    },
    /* grunt-ant-sfde retrieve */

    antretrieve: {
      options: {
        user: 'anders.nehlin@softhouse.se',
        pass: '!QAZx#EDCsw2QdzdnzdfcbDsyWYQRp4K1mlH'
      },
      // specify one retrieve target
      src: {
        serverurl:  'https://login.salesforce.com', // default => https://login.salesforce.com
        pkg: {
          staticresource: ['*'],
          apexclass:      ['*'],
          apextrigger:      ['*'],
          apexpage:       ['*']
        }
      }
    },

    antdeploy: {
      // define global options for all deploys
      options: {
        root: 'build/',
        version: '27.0'
      },
      // create individual deploy targets. these can be
      // individual orgs or even the same org with different packages
      src:  {
        options: {
          user: 'anders.nehlin@softhouse.se', // storing my un/pw as env vars for security
          pass: '!QAZx#EDCsw2', // storing my un/pw as env vars for security
          token: 'QdzdnzdfcbDsyWYQRp4K1mlH',
          serverurl: 'https://login.salesforce.com' // default => https://login.salesforce.com
        },
        pkg: {
          staticresource: ['*'],
          apexclass:      ['*'],
          apextrigger:      ['*'],
          apexpage:       ['*']
        }
      }
    },

    clean: {
      build: ['tmp', 'build/package.xml']
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-zipstream');
  grunt.loadNpmTasks('grunt-ant-sfdc');
  grunt.loadNpmTasks('grunt-gh-pages');

  // custom task to write the -meta.xml file for the metadata deployment
  grunt.registerTask('write-meta', 'Write the required salesforce metadata', function() {
    grunt.log.writeln('Writing metadata...');
    var sr = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">',
      '  <cacheControl>Public</cacheControl>',
      '  <contentType>application/zip</contentType>',
      '  <description>MyTest Description</description>',
      '</StaticResource>'
    ];
    var dest = grunt.template.process('<%= zip.build.dest %>') + '-meta.xml';
    grunt.file.write(dest, sr.join('\n'));
  });

  // default task (no deploy)
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'copy', 'zip', 'write-meta' ]);

  // 'all' task including deploy
  grunt.registerTask('all', ['default', 'antdeploy']);

    // 'all' task including deploy
  grunt.registerTask('test', ['uglify']);

};