module.exports = function(grunt) {
	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - 合并时间 - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: [
					'src/js/marking/global.js',
					'src/js/marking/config.js',

					'src/js/marking/onLeftList.js',
					'src/js/marking/onColumn.js',
					'src/js/marking/onDragenter.js',
					'src/js/marking/onrightList.js',

					'src/js/marking/leftlist.js',

					'src/js/marking/getChartData.js',
					'src/js/marking/formatModal.js',
					'src/js/marking/documentRemove.js',

					'src/js/marking/main.js'
				],
				dest: 'dest/js/marking.min.js'
			}
		}
	});
	// 加载提供"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// 默认任务
	grunt.registerTask('default', ['uglify']);
}