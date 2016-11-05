# varJS

### 版本
#### 0.0.0.1 提供存取变量的功能,解决全局污染问题
#### 0.0.0.2 对全局变量的存取方式进行了修改
#### 0.0.0.3 支持>运算进行存取变量,增加了judge.js
#### 0.0.0.4 judge.js 与 global.JS合并,并增加了一些新的方法和预定义属性
#### 0.0.0.5 增加了几个新的方法,增加了sizzle.js,能够以Var.element()来获取元素
#### 0.0.0.6 取消了一些预定义属性和方法,定义常量不再支持IE8-
#### 0.0.0.7 增加了2个常用方法

### 说明
######  varJS 采用grunt编译
######  varJS 将来主要提供对变量的操作,和提供对模板操作的功能

### 模块
###### 1. global.JS
###### 2. template.JS
###### 3. expand.JS
###### 4. is.JS
###### 5. html.JS
###### 6. sizzle.JS
---
### 快速开始
> 1.1创建一个自己的分支
```
	var main = new Var;
```
> 1.2创建一个变量
```
	main.var('a',100);
```
> 1.3获取一个变量
```
	main.var('a'); // 100
```

> 2.1varJS支持创建一个常量
常量通常不能被改变,一旦创建将始终保持初始的值
```
	var main = new Var;
	min.const('a',100);
	min.const('a');	// 100
	min.const('a',200);
	min.const('a');	// 100
```

> 3.1 varJS支持调用其他实例化数据,但是创建分支的时候要定义一个名字
```
	var main = new Var('main');
	var sw = new Var('sw');
	main.b = 100;
	sw.varData('main','b') // 100;
``` 
---
### 更多API
#### API 目录
- 0.1 var
- 0.2 const
- 0.3 addMethods
- 0.4 check
- 0.5 merge
- 0.7 debugge
- 0.8 element
- 0.9 getTemplate
- 1.0 html
- 1.1 init
- 1.2 is
- 1.3 isArray
- 1.4 isDOM
- 1.5 isFormElement
- 1.6 isFunction
- 1.7 isLikeArray
- 1.8 isNumber
- 1.9 isObject
- 2.0 isString
- 2.1 parseJson
- 2.2 random
- 2.3 setTemplate
- 2.4 copy

##### 0.3 addMethods 为所有的var示例加入一个方法
```
	var main = new Var('main');
	main.addMethods('fn',function(){
		console.log(0);
	})
	main.fn() // 0;
``` 

##### 0.4 check 比较2个值的内容是否相等 第三个参数设置为true则判断全等
```
	main.check(1,1); // true
	main.check(1,'1'); // false
	main.check(1,'1',true); // true
``` 

##### 0.5 merge 合并对象,最后一个值可以传入一个数值,来确定合并几层数据
```
	main.merge({a:1,b:2},{a:2}); // {a:2,b:2}
``` 

##### 0.7 debugge 调试数据,将数据直接复制给window.$var; 可以在控制台进行查看
```
	var main = new Var('main');
	main.debugge();
	console.log($var);
``` 


#####  0.8 element 以css选择器的方式获取一个页面元素
```
 var main = new Var;
 main.element('div');
```

##### 0.9 getTemplate 获取渲染后的html
```
 // 可以使用 {} 来直接调用已经设置的模板
 main.setTemplate('abc','<div>{{id}}</div>');	// 设置一个模板
 main.getTemplate('{abc}',{id:'abc'});	// <div>abc</div>
 main.getTemplate('<div>{{id}}</div>',{id:'abc'});	// <div>abc</div>
```

##### 1.0 html 返回一个dom元素
```
 main.html('<div></div>'); //<div></div>
```

##### 1.1 init 初始化函数
```
main.init('a',function(){	// 设置初始化函数
	console.log(0);
})

main.init(function(){	// 设置一个匿名的初始化函数
	console.log(0);
})

main.init() // 调用初始化函数
main.init('a') // 单独调用一个初始化函数
```

##### 1.2 is 获取一个数据的类型
```
main.is('abc') // string
```

##### 1.3 isArray 判断类型是否是一个数组
```
main.isArray([]) // true
```

##### 1.4 isDom 判断类型是否是dom
```
main.isDom('abc') // false
```

##### 1.5 isFormElement 判断类型是否是一个表单元素
```
var input = main.html('<input type="text">');
main.isFormElement(input) // true
```

#####  1.6 isFunction 判断类型是否是function
```
main.isFunction(function(){}) // true
```

#####  1.7 isLikeArray 判断类型是否是一个可遍历对象
```
main.isLikeArray({0:'',1:'',length:1}) // true
```

#####  1.8 isNumber 判断类型是否是数字
```
main.isNumber(1) // true
```

##### 1.9 isObject 判断类型是否是对象
```
main.isObject({}) // true
```

#####  2.0 isString 判断类型是否是字符串
```
main.isString('abc') // true
```

#####  2.1 parseJson 将一个JSON转换成一个对象 / 不同的是转换一个对象不会报错
```
	main.parseJson('{"a" : 1}') // {a:1}
	main.parseJson({a:1}) // {a:1}
```
#####  2.2 random 随机数
```
main.random()	// 随机 1~100 整数
main.random(1,50)	// 随机 1~50 整数
main.random(1.01,2)	// 随机 1.01~2.00 之间的数
```

##### 2.3 setTemplate 设置一个模板
```
 // 可以使用 {} 来直接调用已经设置的模板
 main.setTemplate('abc','<div>{{id}}</div>');	// 设置一个模板
 main.getTemplate('{abc}',{id:'abc'});	// <div>abc</div>
```

#####  2.4 copy 深拷贝
```
var obj = {a : 100};
var b = main.copy(obj)	// 能够完全拷贝一个任意类型数据
b.a = 200;
b;	// {a : 200}
obj; // {a : 100}
```
