"use strict"; // 进入严格模式 代码必须在严格模式下编写
var Var = (function() {
	if(Var) console.info('varJS reloading!');
	var $database = {} // 数据库
	/**
	 * varJS 主函数 加载或读出内容
	 * @param {String} varName 分支 / 只能以字母_$开头,字母数字$_结尾
	 */
	function Global() {
		var $branch = random6xkey(8);
		while($database[$branch]) {
			$branch = random6xkey(8);
		}
		this.$branch = $branch;
		$database[this.$branch] = {};
	}
	/**
	 * 用于var的调试 直接将数据库释放到全局
	 * @param {Object} varName 调试用户名
	 */
	Global.prototype.debugge = function() {
			window.$var = $database[this.$branch];
			console.log('debugge start $var =>', window.$var);
		}
	/**
		 * 为Var加入一个新的属性 或 方法
		 * @param {String} name 属性或方法名
		 * @param {Object} methods 属性或方法
		 */
	Global.prototype.addMethods = function(name, methods) {
		try {
			global.prototype[name] = methods;
		} catch(e) {
			var $console = ['global.addMethods() no success! why : '];
			if(typeof name !== 'string') {
				$console.push('There is an error in the type of parameter!');
				return false;
			}
			switch(undefined) {
				case name:
					$console.push('lack of parameter name!');
					break;
				case methods:
					$console.push('lack of parameter methods!');
					break;
				default:
					$console.push('unknown!');
					break;
			}
			return false;
		}
		return this;
	}
	/**
	 * 返回一个以 $_ 开头的N位秘钥,内容为数字及小写字母组成
	 * @param {Object} int
	 */
	function random6xkey(int) {
		int = int || 6;
		var randomSeed = '1,2,3,4,5,6,7,8,9,0,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
		var rtnArr = []
		for(var i = 0; i < int; i++) {
			rtnArr.push(randomSeed.split(',')[parseInt(Math.random() * 36)]);
		}
		return '$_' + rtnArr.join('');
	}
	/**
	 * 存取变量
	 */
	Global.prototype.var = function($name,$fn){
		if($fn){
			$database[this.$branch][$name] = $fn;
		} else {
			return $database[this.$branch][$name];
		}
	}
	return Global;
})();