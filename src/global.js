"use strict"; // 进入严格模式 代码必须在严格模式下编写
var Var = (function() {
	if(Var) console.info('varJS reloading!');
	var $database = {
			'$module': {}
		},
		$predefined = { // 预定义的
			'__template': {},
			'__init': []
		};
	/**
	 * copy一组新的数据
	 * @param {Object} data
	 */
	function copyVar(data) {
		switch(Global.prototype.is(data)) {
			case 'array':
				var arr = [];
				for(var i = 0, j = data.length; i < j; i++) {
					arr[i] = copyVar(data[i]);
				}
				return arr;
			case 'likeArray':
			case 'object':
				var obj = {};
				for(var k in data) {
					obj[k] = copyVar(data[k]);
				}
				return obj;
			default:
				return data;
		}
		return data;
	};
	/**
	 * varJS 主函数 加载或读出内容
	 * @param {String} varName 分支 / 只能以字母_$开头,字母数字$_结尾
	 */
	function Global(name) {
		if(name) {
			if($database[name]) {
				console.info('Unable to create the,Because the name already exists!');
				return false;
			} else {
				$database[name] = this;
			}
		}
		for(var k in $predefined) {
			this[k] = copyVar($predefined[k]);
		}
	};
	/**
	 * 用于var的调试 直接将数据库释放到全局
	 * @param {Object} varName 调试用户名
	 */
	Global.prototype.debugge = function() {
		window.$var = this;
		window.$database = $database;
		console.log('%cdebugge =>', 'color:red');
		console.log('$var =>', window.$var);
		console.log('$database =>', window.$database);
	};
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
	};

	function GInit($this, $name) { // 核心函数 - 获取变量
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
	};

	// 定义一个变量
	Global.prototype.var = function($name, $fn) {
		// 检查预定义变量
		for(var k in $predefined) {
			if($name === k) {
				return console.log('The ' + $name + ' has been defined in advance');
			}
		}
		var rtn = GInit(this, $name);
		if(typeof $name === 'string' && arguments.length === 2) {
			rtn[0][rtn[1]] = $fn;
		} else if(typeof $name === 'string' && arguments.length === 1) {
			return rtn[0][rtn[1]];
		}
	};

	// 定义一个常量
	Global.prototype.const = function($name, $fn) {
		// 检查预定义变量
		var rtn = GInit(this, $name);
		if(typeof $name === 'string' && arguments.length === 2) {
			if(rtn[0][rtn[1]]) {
				return copyVar(rtn[0][rtn[1]]);
			} else {
				rtn[0][rtn[1]] = $fn;
				Object.defineProperty(rtn[0], rtn[1], {
					writable: false
				})
			}
		} else if(typeof $name === 'string' && arguments.length === 1) {
			return copyVar(rtn[0][rtn[1]]);
		}
	};
	/**
	 * init 初始化事件
	 * @param {String} fnName 函数描述
	 * @param {Function} fn	初始化的函数
	 */
	Global.prototype.init = function(fnName, fn) {
		try {
			if(fnName && !fn) { // 返回某个事件函数
				if(typeof fnName === 'function') {
					this.__init.push({
						'_function': fnName
					});
				} else {
					for(var i = 0, j = this.__init.length; i < j; i++) {
						if(this.__init[i].name === fnName) {
							return this.__init[i]._function;
						}
					}
					return this.__init[fnName];
				}
			} else if(fnName && fn) {
				this.__init.push({
					name: fnName,
					_function: fn
				});
				return true;
			} else if(!fnName && !fn) {
				for(var i = 0, j = this.__init.length; i < j; i++) {
					try {
						this.__init[i]._function();
					} catch(e) {
						console.log('Don\'t have the right to perform ', (this.__init[i].name || 'unnamed') + '()');
					}
				}
			}
		} catch(e) {
			console.error(e);
		}
	};

	/**
	 * 解析返回的JSON
	 * @param {Object} data 数据
	 */
	Global.prototype.parseJson = function(data) {
		var rtnData = data;
		if(typeof data === 'string') {
			data =
				(data !== '<html><body><h1>内部服务器错误</h1></body></html>') ?
				JSON.parse(data) : false;
		} else if(typeof data === 'object' && data.code === 10) {
			data = false;
		}
		if(!data) {
			console.log('parseJson : 解析出现错误! /n 原始数据 : ', data);
		}
		return data;
	};

	/**
	 * 判断变量的类型
	 * @param {Object} content 变量
	 */
	Global.prototype.is = function(content) {
		try {
			if(content === null) return null;
			if(typeof content !== "object") return typeof content;
			if(content.nodeType) return "domElement";
			if(typeof content === "object" && Object.prototype.toString.call(content) === "[object Array]") return "array";
			if(content.length && typeof content.length === "number" && content.length > -1) return "likeArray";
			if(typeof content === "object") return Object.prototype.toString.call(content).replace(/\[object (\w+)\]/, "$1").toLowerCase();
			return "cannotJudge variableType!";
		} catch(e) {
			return "cannotJudge variableType!";
		}
	};
	/**
	 * 完全拷贝一个新的参数
	 * @param {Object} data
	 */
	Global.prototype.copy = function(data) {
		return copyVar(data);
	};

	/**
	 * 检查两个对象是否相等
	 * @param {Object} $d1 被检查的对象
	 * @param {Object} $d2 参照对象
	 * @param {Object} $f 默认false,是否进行全等检查
	 */
	Global.prototype.check = function($d1, $d2, $f) {

	};
	/**
	 * 获取一个变量或者获取其他分支的一个变量
	 * 替代varData及constData
	 * @param {Object} name
	 * @param {Object} $name
	 */
	Global.prototype.get = function(name, $name) {
		if(!(name || $name)) return this;
		if($name) {
			// 检查预定义变量
			if(!$database[name]) {
				console.info('Don\'t have the branch!');
				return undefined;
			}
			var rtn = GInit($database[name], $name);
		} else {
			var rtn = GInit(this, name);
		}
		return rtn[0][rtn[1]];
	}
	return Global;
})();