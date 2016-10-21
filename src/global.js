"use strict"; // 进入严格模式 代码必须在严格模式下编写
var Var = (function() {
	if(Var) console.info('varJS reloading!');
	var $database = {}, // 数据库
		unnamedLength = 0; // 未命名分支 从0开始的
	/**
	 * varJS 主函数 加载或读出内容
	 * @param {String} varName 分支 / 只能以字母_$开头,字母数字$_结尾
	 */
	function Global($name,$fn) {
		if (varName && /$\$unnamed\w*^/.test(varName)){
			console.error('Rename error! varName => ',varName);
			return false;
		}
		this.branch = varName || ('$unnamed' + (unnamedLength++));
		if($database[this.branch]) {
			$database[this.branch] = {};
		} else {
			console.info('Branch name being used\nunable to complete to create');
		}
	}
	/**
	 * 用于var的调试 直接将数据库释放到全局
	 * @param {Object} varName 调试用户名
	 */
	Global.prototype.debugge = function(varName) {
			window.$var = (varName ? $database[varName] : $database);
			console.log('debugge start $var =>', window.$var);
		}
	/**
	 * 为Var加入一个新的属性 或 方法
	 * @param {String} name 属性或方法名
	 * @param {Object} methods 属性或方法
	 */
	Global.prototype.addMethods = function(name, methods) {
		try {
			global.prototype[name] = methods;
		} catch(e) {
			var $console = ['global.addMethods() no success! why : '];
			if(typeof name !== 'string') {
				$console.push('There is an error in the type of parameter!');
				return false;
			}
			switch(undefined) {
				case name:
					$console.push('lack of parameter name!');
					break;
				case methods:
					$console.push('lack of parameter methods!');
					break;
				default:
					$console.push('unknown!');
					break;
			}
			return false;
		}
		return this;
	}
	
	/**
	 * 返回一个以 $_
	 * @param {Object} int
	 */
	function random6xkey (int){
		
	}
	
	return Global;
})();