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
		return (a + num) / multiple;
	} else if (a && typeof a === 'number' && !b){
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
