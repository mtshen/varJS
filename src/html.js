// 返回一个dom元素
Var.prototype.addMethods('html', function(innerhtml) {
	var box = document.createElement('div') 
	box.innerHTML = innerhtml;
	return box.childNodes[0];
})