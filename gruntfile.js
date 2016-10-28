module.exports = function(grunt) {
	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! var.min.js | mtshen | 轻量级变量查取库 */\n'
			},
			build: {
				src: [
					'src/global.js',
					'src/template.js',
					'src/expand.js',
					'src/is.js',
					'src/sizzle.js',
					'src/html.js'
				],
				dest: 'dest/var.min.js'
			}
		}
	});
	// 加载提供"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// 默认任务
	grunt.registerTask('default', ['uglify']);
}