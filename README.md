# vue-split-multi

多页面分包工程

# 目录结构

```c
|-- /
    |-- .babelrc
    |-- .gitignore
    |-- README.md
    |-- build //打包脚本目录
    |-- index.html //html入口
    |-- package.json  //依赖表
    |-- webpack.config.js //项目配置文件
    |-- dist //build输出目录
    |-- src //业务逻辑目录
    |   |-- index.js //项目入口模板
    |   |-- assets //其他资源，引入方式：import '@a' 在webpack.config.js中修改
    |   |   |-- image
    |   |-- common //公共方法及样式
    |   |   |-- js //公共方法目录，引入方法: import '@j' 在webpack.config.js中修改
    |   |   |-- scss //公共样式，引入方法：import '@s' 在webpack.config.js中修改
    |   |-- components //公用组件目录，引入方法：import '@c' 在webpack.config.js中修改
    |   |   |-- index.js //分包组件入口，！重要必须存在即使是空文件
    |   |   |-- extend //扩展公共组件目录
    |   |   |-- base //全局公共组件目录
    |   |-- modules //业务逻辑页面目录
    |   |   |-- base //模块包目录，！不能取名static
    |   |   |   |-- home //功能模块目录
    |   |   |       |-- page1 //页面目录
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

>推荐使用[cnpm](https://cnpmjs.org/)进行安装

>macos、linux请使用sudo命令获取管理员权限安装


## 本地调试

```
$ npm run dev
```

编译开始提示[选择环境](#环境选择)

## 本地构建

```
$ npm run build
```
编译开始提示[选择环境](#环境选择)

编译完成后会根据[webpack.config.js](#webpack配置)中的配置运行sourcemap整理脚本，将各页面sourcemap文件放入指定文件夹
## 构建zip包

```
$ npm run zips
```
该命令将会把dist下所有目录打包成对应名称的zip文件
## 环境选择

```
$ 请输入运行的环境：
```
该命令会选择[webpack.config.js](#webpack配置)中[default.env](#default)中第一个环境为默认环境。

选中的环境中对应对象将会在所有页面文件中生效

选择完环境后提示[选择离线包](#离线包选择)
## 离线包选择

```
$ 请输入需要打包的模块名，以空格分隔（不输入则全部打包）：
```
src/modules/下的文件夹为离线包名称、输入各离线包名可以实现指定离线包打包功能

# webpack配置
配置文件为根目录下webpack.config.js

## dir
固定设置为_dirname

## default
默认配置项，dev、build公共配置属性

+ output - build输出目录，默认为dist
+ resolve - 解析，配置缩写及简写
+ externals - 外部扩展，用于引入静态第三方库
+ env - 环境变量配置，第一个环境为默认环境
+ global - 全局变量配置
+ plugins - webpack插件列表，默认使用vue加载器、打包相关插件无需引入
+ loader - webpack loader列表，vue-splitter与url-loader一致

## dev
调试模式相关配置
+ port - 实时调试模式监听端口号，默认8082
+ host - 实时调试模式监听ip，默认0.0.0.0 等效于localhost
+ devtool - sourcemap配置

## build
编译模式相关配置
+ devtool - sourcemap配置，默认source-map