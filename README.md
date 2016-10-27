# varJS

### 版本
#### 0.0.0.1 提供存取变量的功能,解决全局污染问题
#### 0.0.0.2 对全局变量的存取方式进行了修改
#### 0.0.0.3 支持>运算进行存取变量,增加了judge.js
#### 0.0.0.4 judge.js 与 global.JS合并,并增加了一些新的方法和预定义属性

### 说明
######  varJS 采用grunt编译
######  varJS 将来主要提供对变量的操作,和提供对模板操作的功能

### 模块
######  global.JS
######  template.JS

### 演示
###### 创建一个存取变量对象
```
  var mtshen = new Var(); // 创建一个可以存取变量的主节点
```

###### 创建一个变量
```
  mtshen.var('demo>str','hello varJS'); // 自动创建变量 mtshen.demo.str
  mtshen.var('demo>str'); // hello varJS
  mtshen.demo.str; // hello varJS
```

###### 创建一个常量
```
  // 设置的常量通常不会被改变
  mtshen.const('a','hello varJS'); // 设置常量a
  mtshen.const('a'); // hello varJS
  mtshen.const('a','abc'); 
  mtshen.const('a'); // hello varJS
```

###### 判断一个变量的类型
```
 mtshen.is('abc'); // string
 mtshen.is(100); // number
 mtshen.is(true); // boolean
 mtshen.is([]); // array
 ...
```

###### 模板
```
 // 可以使用 {} 来直接调用已经设置的模板
 mtshen.setTemplate('abc','<div>{{id}}</div>');	// 设置一个模板
 mtshen.getTemplate('{abc}',{id:'abc'});	// <div>abc</div>
 mtshen.getTemplate('<div>{{id}}</div>',{id:'abc'});	// <div>abc</div>
```

###### 初始化函数
```
mtshen.init('a',function(){	// 设置初始化函数
	console.log(0);
})

mtshen.init(function(){	// 设置一个匿名的初始化函数
	console.log(0);
})

mtshen.init() // 调用初始化函数
mtshen.init('a') // 单独调用一个初始化函数
```
