/**
 * templat 渲染模板
 * @param {String} templateHtml	模板内容 可以用 {} 包含,这样将直接在this.__template 中获取
 * @param {Object} rules 渲染规则
 * 模板需要渲染的内容只能用英文数字和-
 */
Var.prototype.getTemplate = function(templateHtml, rules) {
	var tplExec = /^\{([\w$_]+)\}$/.exec(templateHtml),
		$template = tplExec ? this.__template[tplExec[1]] : templateHtml;
	if(!rules) return $template;
	try {
		for(var k in rules) {
			var templateRegExp = new RegExp('{{' + k + '}}', 'g');
			$template = $template.replace(templateRegExp, rules[k]);
		}
		return $template;
	} catch(e) {
		console.error(e);
	}
}

// 添加模板
Var.prototype.setTemplate = function(templateName, templateHtml) {
	this.__template[templateName] = templateHtml;
}
