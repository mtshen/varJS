// 随机整数 / 随机浮点数
Var.prototype.addMethods('random', function(a, b) {
	if(a && b && typeof a === 'number' && typeof b === 'number') {
		var d_a = ('' + a).split('.'),
			d_b = ('' + b).split('.'),
			d_aAr = (d_a[1] ? d_a[1].length : 0),
			d_bAr = (d_b[1] ? d_b[1].length : 0),
			multiple = Math.pow(10, Math.max(d_aAr, d_bAr));
		a = a * multiple;
		b = b * multiple;
		var num = parseInt(Math.random() * (b - a + 1));
		return(a + num) / multiple;
	} else if(a && typeof a === 'number' && !b) {
		var d_a = ('' + a).split('.')
		d_aAr = (d_a[1] ? d_a[1].length : 0)
		multiple = Math.pow(10, d_aAr);
		a = a * multiple;
		var num = parseInt(Math.random() * (a + 1));
		return num / multiple;
	} else {
		return parseInt(Math.random() * 100);
	}
});

// 对象合并
Var.prototype.addMethods('merge', (function() {
	function _methods(obj1, obj2, num) {
		obj1 = Var.prototype.copy(obj1);
		obj2 = Var.prototype.copy(obj2);
		if(num !== true && num-- == 0) return obj1
		var ko = Var.prototype.is(obj1);
		switch(Var.prototype.is(obj1)) {
			case 'object':
			case 'likeArray':
				if(Var.prototype.is(obj2) === ko) {

					for(var k in obj2) {
						var objk = Var.prototype.is(obj1[k]);
						switch(objk) {
							case 'array':
							case 'object':
							case 'likeArray':
								if(Var.prototype.is(obj2[k]) === objk) {
									obj1[k] = _methods(obj1[k], obj2[k], num);
								}
								break;
						}
						if(!obj1[k]) {
							obj1[k] = obj2[k];
						}
					}
				}
				break;
			case 'array':
				obj1[k] = obj2[k];
				/* 暂时不放开合并array功能 有待测试
				for(var i = 0, j = obj2.length; i < j; i++) {
					var objk = Var.prototype.is(obj1[i]);
					switch(objk) {
						case 'array':
						case 'object':
						case 'likeArray':
							if(Var.prototype.is(obj2[i]) === objk)
								obj1[i] = _methods(obj1[i], obj2[i], num);
							break;
					}
					if(!obj1[i]) {
						obj1[i] = obj2[i];
					}
				}*/
				break;
		}
		return obj1
	}
	return function() {
		var objArrs = this.copy(Array.prototype.slice.call(arguments));
		var addNum = true;
		var objArrsPop = objArrs[objArrs.length - 1];
		switch(typeof objArrsPop) {
			case 'number':
				addNum = objArrs.pop();
				break;
			case 'string':
				objArrsPop = this.const(objArrsPop);
				break;
		}
		for(var i = objArrs.length - 1, j = 0; i > j; i--) {
			var objArrIndex = objArrs[i - 1];
			if(typeof objArrIndex == "string") {
				objArrIndex = this.const(objArrIndex);
			}
			objArrIndex = _methods(objArrIndex, objArrs[i], addNum);
		}
		return objArrIndex;
	}
})());

//var $this = this;
//var r = /^\[((!?[\w$_],?)+)\]$/.exec($name);
//if(!r) return false;
//if(r) {
//	var rge = r[1].split(',');
//	for(var i = 0, j = rge.length; i < j; i++) {
//		var rgei = /^! ?(.*)$/.exec(rge[i]);
//		if(rgei) { // 不存在
//			if($this[rgei[1]] === undefined) return false;
//		} else { // 存在
//			if(!($this[rge[i]] === undefined)) return false;
//		}
//	}
//	return true;
//}