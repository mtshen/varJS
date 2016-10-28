/**
 * templat 渲染模板
 * @param {String} templateHtml	模板内容 可以用 {} 包含,这样将直接在this.__template 中获取
 * @param {Object} rules 渲染规则
 * 模板需要渲染的内容只能用英文数字和-
 */
Var.prototype.getTemplate = (function() {
	function __tpl(templateHtml) {
		var $templateHtml = templateHtml;
		$templateHtml = __tpl_ifElseFn($templateHtml); // 判断函数
		// 其他函数 code..
		return $templateHtml;
	}

	// if ... else ...
	function __tpl_ifElseFn(templateHtml) {
		// 是否存在函数
		var tpl_regexp = templateHtml.match(/^\{\{ ?if ?([^{}]*)\}\}(.*)\{\{ ?if ?\}\}$/);
		console.log(tpl_regexp);
		if(!tpl_regexp) return templateHtml;
		var tpl_html = tpl_regexp[0]
			.replace('\'', '\"')
			.replace(/\{\{ ?if ?([^{}]+)\}\}/, 'if($1){\'')
			.replace(/\{\{ ?else ?([^{}]+)\}\}/g, '\'}else if($1){\'')
			.replace(/\{\{ ?else ?\}\}/, '\'} else {\'')
			.replace(/\{\{ ?if ?\}\}/, '\'}');
		templateHtml = templateHtml.replace(/\{\{ ?if ?([^{}]*)\}\}(.*)\{\{ ?if ?\}\}/, eval(tpl_html));
		__tpl_ifElseFn(templateHtml);
	}

	return function(templateHtml, rules) {
		var tplExec = /^\{([\w$_]+)\}$/.exec(templateHtml),
			$template = tplExec ? this.__template[tplExec[1]] : templateHtml;
		$template = __tpl($template);
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
})();

// 添加模板
Var.prototype.setTemplate = function(templateName, templateHtml) {
	this.__template[templateName] = templateHtml;
}