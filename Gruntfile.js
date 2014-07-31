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

    // copy svg to dist folder
    copy: {
      svg: {
        src: 'asset/svg/rocket-scene.svg',
        dest: 'dist/rocket-scene.svg'
      },
      scripts: {
        src: 'asset/js/rocket-animation.js',
        dest: 'dist/rocket-animation.js'
      },
      html: {
        src: 'index.html',
        dest: 'dist/index.html'
      }
    },

    // gh pages this thing ;)
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: '**/*'
    },

    // compress for dist
    uglify: {
      default: {
        options: {
          sourceMap: true,
          compress: true
        },
        files: {
          'dist/rocket-animation.min.js': [ 'asset/js/**/*.js' ]
        }
      },
      complete: {
        options: {
          sourceMap: true,
          compress: true
        },
        files: {
          'dist/rocket-animation.complete.min.js': [ 'asset/vendor/snap.svg/dist/snap.svg.js', 'asset/js/**/*.js' ]
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
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-bump' );
  grunt.loadNpmTasks( 'grunt-gh-pages' );
  grunt.loadNpmTasks( 'grunt-html-validation' );

  // register tasks
  grunt.registerTask( 'default', [ 'jshint', 'validation:svg', 'connect:server', 'watch:scripts' ] );
  grunt.registerTask( 'test', [ 'jshint', 'validation:svg' ] );
  grunt.registerTask( 'build', [ 'test', 'uglify', 'copy' ] );
  grunt.registerTask( 'dist', [ 'build', 'gh-pages' ] );
};
