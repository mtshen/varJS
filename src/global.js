"use strict"; // 进入严格模式 代码必须在严格模式下编写
var Var = (function() {
	if(Var) return console.info('varJS reloading!'); // 检查重复引用
	// 预定义的
	var $database = { // 预定义库
			'$module': {}
		},
		$predefined = { // 预定义的变量
			'__template': {},
			'__init': [],
			'__scope': {},
		};
	// 核心文件
	var SET_VAR_CONST = (function() {
		var NAME_BLACKLIST = /(^__template$)|(^__init$)|(^__scope$)/;
		/**
		 * 查询改变量下的某一个变量 0.2x
		 * @param {Object} $data    	查询变量
		 * @param {Object} $nextName	子变量名称
		 * @param {Object} $placeholder	如果自变量不存在的占位变量
		 * 会返回一个具体的值
		 * */
		function GET_NEXT_NAME($data, $nextName, $placeholder) {
			var data = $data[$nextName];
			return(data ? data : $placeholder);
		}

		/**
		 * 查询改变量下的某一个变量 0.2x
		 * @param {Object} $data    	查询变量
		 * @param {Object} $nextName	查询条件
		 * 会返回一个数组
		 * */
		function GET_NEXT_ATTRIBUTE($data, $nextName) {
			var data = $data;
			var $regexpRtn = /(?:^\[([_$\w]*) *(\$=) *(.*)\]$)|(?:^\[([_$\w]*) *([\^!*]?=?) *(.*)\]$)/.exec($nextName);
			var $cont = [];
			if($regexpRtn) {
				$cont[0] = $regexpRtn[1] || $regexpRtn[4]; // 验证内容
				$cont[1] = $regexpRtn[2] || $regexpRtn[5]; // 验证方式
				$cont[3] = $regexpRtn[3] || $regexpRtn[6]; // 验证结果
			}
			try {
				for(var k in $data) {
					var regeData = $data[k];

				}
				switch($cont[1]) {
					case '!=':
						break;
					case '^=':
						break;
					case '$=':
						break;
					case '*=':
						break;
					case '=':
						break;
					case '!':
						break;
					default:
						break;
				}
			} catch(e) {}
			return(data ? data : $placeholder);
		}

		// 核心函数 第一层 获取 >
		function ET_INIT($this, $name) {
			var arr = $name.replace(/ *> */g, '>').split('>'); // 分割
			if(arr.length === 1) return [$this, $name] // 优化 | 如果只有1层 ,直接返回结果		
			$this[arr[0]] = ($this[arr[0]] ? $this[arr[0]] : {}); // 如果存在未定义的路径地址,赋值为 {};
			var rtn = $this[arr[0]]; // 获取第一个路径地址
			for(var i = 1, j = arr.length - 1; i < j; i++) { // 路径循环查询
				if(!rtn[arr[i]]) rtn[arr[i]] = {};
				rtn = rtn[arr[i]];
			} // 查询结束
			return [rtn, arr[j]];
		};

		return function($name, $fn, $const) {
			// 检查预定义命名冲突
			if(NAME_BLACKLIST.test($name)) return console.log('The ' + $name + ' has been defined in advance');
			var rtn = ET_INIT(this, $name); // 得到路径 [倒数第二路径,最后路径]
			if(typeof $name === 'string' && $fn) {
				if(rtn[0][rtn[1]]) {
					return($const ? copyVar(rtn[0][rtn[1]]) : rtn[0][rtn[1]]);
				} else {
					rtn[0][rtn[1]] = $fn;
					$const && Object.defineProperty(rtn[0], rtn[1], {
						writable: false
					})
				}
			} else if(typeof $name === 'string' && !$fn) {
				var rtn = ($const ? copyVar(rtn[0][rtn[1]]) : rtn[0][rtn[1]]);
				return rtn;
			}
		};
	})();

	/**
	 * copy一组新的数据
	 * @param {Object} data
	 */
	function copyVar(data) {
		switch(Global.prototype.is(data)) {
			case 'array':
				var arr = [];
				for(var i = 0, j = data.length; i < j; i++) {
					arr.push(copyVar(data[i]));
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

	// 定义一个变量
	Global.prototype.var = function($name, $fn) {
		return SET_VAR_CONST.call(this, $name, $fn, false);
	};
	// 定义一个常量
	Global.prototype.const = function($name, $fn) {
		return SET_VAR_CONST.call(this, $name, $fn, true);
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
						this.__init[i]._function.call(this);
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

	function _check($d1, $d2, $f) {
		return($f ? $d1 === $d2 : $d1 == $d2);
	}

	/**
	 * 检查两个对象是否相等
	 * @param {Object} $d1 被检查的对象
	 * @param {Object} $d2 参照对象
	 * @param {Object} $f 默认false,是否进行全等检查
	 */
	Global.prototype.check = function($d1, $d2, $f) {
		var flag = true;
		var $isType = this.is($d1);
		switch($isType) {
			case 'object':
			case 'likeArray':
				if($isType === this.is($d2)) {
					for(var k in $d2) {
						if(!$d1[k]) return false;
					}
					for(var k in $d1) {
						if(!$d2[k]) return false;
						switch(objk) {
							case 'object':
							case 'likeArray':
								this.check($d1[k], $d2[k], $f);
								break;
							default:
								if(!_check($d1[k], $d2[k], $f)) {
									flag = false;
								}
								break;
						}
					}
				} else {
					return false;
				}
				break;
			default:
				return _check($d1, $d2, $f);
				break;
		}
		return flag;
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
			var rtn = SET_VAR_CONST.call($database[name], $name);
		} else {
			var rtn = SET_VAR_CONST.call(this, name);
		}
		return rtn;
	}
	Global.prototype.scope = function($name, $fn) {
		this.__scope[$name] = $fn.call(this, this.copy(this));
	};
	Global.prototype.request = function($name, $fn) {
		if(!$fn) {
			return this.__scope[$name];
		} else {
			return this.get($name, '__scope>' + $fn);
		}
	};

	Global.prototype.version = 'Beta 0.1.1';
	return Global;
})();
