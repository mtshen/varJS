module.exports = function(grunt) {
	var fileArray = 'src/global.js,src/template.js,src/expand.js,src/is.js,src/sizzle.js,src/html.js,src/array.js'.split(',');
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		 concat: {
            domop: {
                src: fileArray,
                dest: 'dest/Var.ES6.js'
            }
        },
		uglify: {
			options: {
				banner: '/*! var.min.js | mtshen | 轻量级变量查取库 */\n'
			},
			app_task: {
				files: {
					'dest/Var.min.js': 'dest/Var.js'
				}
			}
		},
		babel: {
			options: {
				presets: [
					'babel-preset-es2015'
				]
			},
			dist: {
				files: {
					'dest/Var.js': 'dest/Var.ES6.js'
				}
			}
		},
		watch: {
			another: {
				files: 'src/*.js',
				tasks: ['concat','babel', 'uglify'],
				options: {
					livereload: 1337
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
}