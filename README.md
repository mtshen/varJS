# varJS

### 版本
#### 0.0.0.1 提供存取变量的功能,解决全局污染问题
#### 0.0.0.2 对全局变量的存取方式进行了修改
#### 0.0.0.3 支持>运算进行存取变量,增加了judge.js

### 说明
######  varJS 采用grunt编译
######  varJS 将来主要提供对变量的操作,和提供对模板操作的功能

### 模块
######  global.JS
######  judge.JS

### 演示
```
  var mtshen = new Var(); // 创建一个可以存取变量的主节点
  mtshen.str = 'hello varJS'; // 创建了一个变量str为 'hello varJS'
  console.log(mtshen.str); // 'hello varJS'
  mtshen.var('demo>str','hello varJS'); // 自动创建 mtshen.demo.str = "hello varJS"
  mtshen.var('demo>str'); // 'hello varJS'
```
