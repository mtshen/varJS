Var.prototype.addMethods('is', function(content) {
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
})