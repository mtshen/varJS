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

// 对象合并 参数
Var.prototype.addMethods('merge', function() {

});

// 对象合并
Var.prototype.addMethods('merge', function() {

});

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