module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		// hint the js
		jshint: {
			options: {
        jshintrc: true
      },
			files: [
				'Gruntfile.js',
        'asset/js/**/*.js'
			]
		},

    // bump version numbers
    bump: {
      options: {
        files: [ 'package.json', 'bower.json' ],
        commitMessage: 'version bump to v%VERSION%',
        commitFiles: [ 'package.json', 'bower.json' ],
        push: false
      }
    },

    // validation for weby stuff
    validation: {
      svg: {
        options: {
          reset: true,
          failhard: true,
          reportpath: false
        },
        files: {
          src: [ 'asset/svg/**/*.svg' ]
        }
      }
    },

    // server for testing stuffs
    connect: {
      server: {
        options: {
          port: 4000,
          base: '.'
        }
      }
    },

    // watch for file changes
    watch: {
      scripts: {
        options: {
          spawn: false
        },
        files: [
          'Gruntfile.js',
          'asset/js/**/*.js'
        ],
        tasks: [ 'jshint' ]
      },
      svg: {
        files: [ 'asset/svg/**/*.svg' ],
        tasks: [ 'validation:svg' ]
      }
    }
	});

  // load tasks
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-bump' );
  grunt.loadNpmTasks( 'grunt-html-validation' );

  // register tasks
  grunt.registerTask( 'default', [ 'jshint', 'validation:svg', 'connect:server', 'watch:scripts' ] );
  grunt.registerTask( 'test', [ 'jshint', 'validation:svg' ] );
};
