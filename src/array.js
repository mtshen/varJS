/**
 * 使Array 的 forEach,filter,map,some,every,indexOf,lastIndexOf,reduce,reduceRight函数支持IE6 + 
 */

// 使forEach函数能够支持 IE6+
if(typeof Array.prototype.forEach != "function") {
	Array.prototype.forEach = function(fn, context) {
		for(var k = 0, length = this.length; k < length; k++) {
			if(typeof fn === "function" && Object.prototype.hasOwnProperty.call(this, k)) {
				fn.call(context, this[k], k, this);
			}
		}
	};
}

// 使filter函数能够支持 IE6+
if(typeof Array.prototype.filter != "function") {
	Array.prototype.filter = function(fn, context) {
		var arr = [];
		if(typeof fn === "function") {
			for(var k = 0, length = this.length; k < length; k++) {
				fn.call(context, this[k], k, this) && arr.push(this[k]);
			}
		}
		return arr;
	};
}

// 使map函数能够支持 IE6+
if(typeof Array.prototype.map != "function") {
	Array.prototype.map = function(fn, context) {
		var arr = [];
		if(typeof fn === "function") {
			for(var k = 0, length = this.length; k < length; k++) {
				arr.push(fn.call(context, this[k], k, this));
			}
		}
		return arr;
	};
}

// 使some函数能够支持 IE6+
if(typeof Array.prototype.some != "function") {
	Array.prototype.some = function(fn, context) {
		var passed = false;
		if(typeof fn === "function") {
			for(var k = 0, length = this.length; k < length; k++) {
				if(passed === true) break;
				passed = !!fn.call(context, this[k], k, this);
			}
		}
		return passed;
	};
}

// 使every函数能够支持 IE6+
if(typeof Array.prototype.every != "function") {
	Array.prototype.every = function(fn, context) {
		var passed = true;
		if(typeof fn === "function") {
			for(var k = 0, length = this.length; k < length; k++) {
				if(passed === false) break;
				passed = !!fn.call(context, this[k], k, this);
			}
		}
		return passed;
	};
}

// 使indexOf函数能够支持 IE6+
if(typeof Array.prototype.indexOf != "function") {
	Array.prototype.indexOf = function(searchElement, fromIndex) {
		var index = -1;
		fromIndex = fromIndex * 1 || 0;

		for(var k = 0, length = this.length; k < length; k++) {
			if(k >= fromIndex && this[k] === searchElement) {
				index = k;
				break;
			}
		}
		return index;
	};
}
// 使lastIndexOf函数能够支持 IE6+
if(typeof Array.prototype.lastIndexOf != "function") {
	Array.prototype.lastIndexOf = function(searchElement, fromIndex) {
		var index = -1,
			length = this.length;
		fromIndex = fromIndex * 1 || length - 1;

		for(var k = length - 1; k > -1; k -= 1) {
			if(k <= fromIndex && this[k] === searchElement) {
				index = k;
				break;
			}
		}
		return index;
	};
}

//  使reduce函数能够支持 IE6+
if(typeof Array.prototype.reduce != "function") {
	Array.prototype.reduce = function(callback, initialValue) {
		var previous = initialValue,
			k = 0,
			length = this.length;
		if(typeof initialValue === "undefined") {
			previous = this[0];
			k = 1;
		}

		if(typeof callback === "function") {
			for(k; k < length; k++) {
				this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
			}
		}
		return previous;
	};
};

//  使reduceRight函数能够支持 IE6+
if(typeof Array.prototype.reduceRight != "function") {
	Array.prototype.reduceRight = function(callback, initialValue) {
		var length = this.length,
			k = length - 1,
			previous = initialValue;
		if(typeof initialValue === "undefined") {
			previous = this[length - 1];
			k--;
		}
		if(typeof callback === "function") {
			for(k; k > -1; k -= 1) {
				this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
			}
		}
		return previous;
	};
};

// 删除数组中的值,返回一个新的数组
Var.prototype.addMethods('delArr', function($var, $fn) {
	var arr = Var.prototype.copy($var);
	var i = 0;
	while(i < arr.length) {
		$fn(arr[i]) && arr.splice(i, 1);
		i++;
	}
	return arr;
});

// 检查数组是否有某值,如果有 返回该值的下标,如果没有 返回-1
Var.prototype.addMethods('delArr', function($var, $fn) {
	for(var i = 0, j = $var.length; i < j; i++) {
		if($fn($var[i])){
			return i;
		}
	}
	return -1;
});