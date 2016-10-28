/**
 * @functionName isString
 * 判断传入的内容是否是string类型
 * @param str
 * @returns {boolean}
 */
Var.prototype.addMethods('isString', function(str) {
		return typeof str === "string";
	})
	/**
	 * @functionName isNumber
	 * 判断传入的内容是否是number类型
	 * @param num
	 * @returns {boolean}
	 */
Var.prototype.addMethods('isNumber', function(str) {
		return typeof num === "number";
	})
	/**
	 * @functionName isFunction
	 * 判断传入的内容是否是function类型
	 * @param fn
	 * @returns {boolean}
	 */
Var.prototype.addMethods('isFunction', function(str) {
		return typeof fn === "function";
	})
	/**
	 * @functionName isString
	 * 判断传入的内容是否是Array类型
	 * @param arr
	 * @returns {boolean}
	 */

Var.prototype.addMethods('isArray', function(str) {
	try {
		return Object.prototype.toString.call(str) === "[object Array]";
	} catch(e) {
		return false;
	}
})

/**
 * @functionName isObject
 * 判断传入的内容是否是Object类型
 * @param obj
 * @returns {boolean}
 */
Var.prototype.addMethods('isObject', function(str) {
		return(typeof obj === "object" && obj !== null) || typeof obj === "function";
	})
	/**
	 * @functionName isDOM
	 * 判断传入的内容是否是dom元素
	 * @param dom
	 * @returns {boolean}
	 */

Var.prototype.addMethods('isDOM', function(str) {
		try {
			return !!(dom && dom.nodeType);
		} catch(e) {
			return false;
		}
	})
	/**
	 * @functionName isLikeArray
	 * 判断传入的内容是否是可遍历类型
	 * @param likeArr
	 * @returns {boolean}
	 */
Var.prototype.addMethods('isLikeArray', function(str) {
	return !!(likeArr.length && typeof likeArr.length === "number" && likeArr.length > -1);
})

Var.prototype.addMethods('isFormElement', function(str) {
	if(!firstDom) return false;
	var allFormElements = "input select option textarea";
	var firstDomNodeName = new RegExp(firstDom.nodeName.toLowerCase());
	return firstDomNodeName.test(allFormElements);
})