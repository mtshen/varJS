"use strict"; // 进入严格模式 代码必须在严格模式下编写
var Var = (function() {
	if(Var) console.info('varJS reloading!');

	/**
	 * varJS 主函数 加载或读出内容
	 * @param {String} varName 分支 / 只能以字母_$开头,字母数字$_结尾
	 */
	function Global() {}

	/**
	 * 用于var的调试 直接将数据库释放到全局
	 * @param {Object} varName 调试用户名
	 */

	Global.prototype.debugge = function() {
			window.$var = $database[this.$branch];
			console.log('debugge start $var =>', window.$var);
		}
		/**
		 * 为Var加入一个新的属性 或 方法
		 * @param {String} name 属性或方法名
		 * @param {Object} methods 属性或方法
		 */
	Global.prototype.addMethods = function(name, methods) {
		try {
			Global.prototype[name] = methods;
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

	function GInit($this, $name) {
		var arr = $name.replace(/ *> */g, '>').split('>');
		if(arr.length === 1) {
			return [$this, $name]
		}
		$this[arr[0]] = $this[arr[0]] ? $this[arr[0]] : {};
		var rtn = $this[arr[0]];
		for(var i = 1, j = arr.length - 1; i < j; i++) {
			if(!rtn[arr[i]]) rtn[arr[i]] = {};
			rtn = rtn[arr[i]];
		}
		return [rtn, arr[j]];
	}

	Global.prototype.var = function($name, $fn) {
		var rtn = GInit(this, $name);
		if(typeof $name === 'string' && arguments.length === 2) {
			rtn[0][rtn[1]] = $fn;
		} else if(typeof $name === 'string' && arguments.length === 1) {
			return rtn[0][rtn[1]];
		}
	}
	return Global;
})();