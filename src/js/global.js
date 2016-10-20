"use strict"; // 进入严格模式 代码必须在严格模式下编写
var global = (function() {
	/**
	 * global核心文件 存储数据
	 * @param { String,Array,Object,Number } key 键
	 * @param { * } val 值
	 * @param { Boolean } flag 是否替换 默认true
	 */
	function global(key, val, flag) {
		flag = flag === undefined ? false : !!flag; // 默认为true
		switch(typeof key) {
			case 'string':
				
		}

		var rtn = false;
		try {
			if(key && val) {
				global[key] = val;
				rtn = true;
			} else if(key) {
				rtn = global[key];
			}!key && console.info('No valid certificate was found parameter!');
		} catch(e) {
			!typeof key === "string" ?
				console.error(key, ' is not a valid parameter!') :
				console.error(e)
		}
		return rtn;
	}
	/**
	 * templat 渲染模板
	 * @param {String} templateHtml	模板内容
	 * @param {Object} rules 渲染规则
	 * 模板需要渲染的内容只能用英文数字和-
	 */
	global.getTemplate = function(templateHtml, rules) {
			if(!(templateHtml && rules)) return !console.info('No valid certificate was found parameter!');
			try {
				for(var k in rules) {
					var templateRegExp = new RegExp('{{' + k + '}}', 'g');
					templateHtml = templateHtml.replace(templateRegExp, rules[k]);
				}
				return templateHtml;
			} catch(e) {
				console.error(e);
			}
		}
	/**
		 * init 初始化事件
		 * @param {String} fnName 函数描述
		 * @param {Function} fn	初始化的函数
		 */
	global.init = function(fnName, fn) {
		try {
			if(fnName && !fn) { // 返回某个事件函数
				return global.initFunction[fnName];
			} else if(fnName && fn) {
				global.initFunction[fnName] = fn;
				global._initFunction.push(fn);
				return true;
			} else if(!fnName && !fn) {
				for(var i = 0, j = global._initFunction.length; i < j; i++) {
					global._initFunction[i]();
				}
			}
		} catch(e) {
			console.error(e);
		}
	}

	/**
	 * 解析返回的JSON
	 * @param {Object} data 数据
	 */
	global.parseJson = function(data) {
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
	}

	/**
	 * @functionName isString
	 * 判断传入的内容的类型,如果无法判断,会返回cannotJudge variableType!
	 * @param content
	 * @returns { string }
	 */
	global.is = function(content) {
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
	return global;
})();