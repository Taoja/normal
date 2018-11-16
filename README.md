# vue-split-multi

多页面分包工程

# 目录结构

```c
|-- /
    |-- .babelrc
    |-- .gitignore
    |-- README.md
    |-- index.html //html入口
    |-- package.json  //依赖表
    |-- webpack.config.js //项目配置文件
    |-- dist //build输出目录
    |-- src //业务逻辑目录
    |   |-- index.js //项目入口模板
    |   |-- assets //其他资源，引入方式：import '@a' 在webpack.config.js中修改
    |   |   |-- image
    |   |-- common //公共方法及样式
    |   |   |-- js //公共方法目录，引入方法: import '@j' 在webpack.config.js中修改
    |   |   |-- scss //公共样式，引入方法：import '@s' 在webpack.config.js中修改
    |   |-- components //公用组件目录，引入方法：import '@c' 在webpack.config.js中修改
    |   |   |-- index.js //分包组件入口，！重要必须存在即使是空文件
    |   |   |-- extend //扩展公共组件目录
    |   |   |-- base //全局公共组件目录
    |   |-- modules //业务逻辑页面目录
    |   |   |-- base //模块包目录，！不能取名static
    |   |   |   |-- home //功能模块目录
    |   |   |       |-- page1 //页面目录
    |   |   |           |-- index.vue  //页面代码
    |   |   |           |-- index.js  //页面入口，固定模板
    |-- static //静态文件
        |-- vue.min.js // 单页面推荐使用静态文件方式引入，否则每个页面都会打包一份vue进代码中
```

# 使用方式

## 安装依赖

```
$ npm run install
```

## 本地调试

```
$ npm run dev
```

## 本地构建

```
$ npm run build
```

## 构建zip包

```
$ npm run zips
```

## 环境选择

```
$ 请输入运行的环境：
```

## 离线包选择

```
$ 请输入需要打包的模块名，以空格分隔（不输入则全部打包）：
```