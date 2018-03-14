# 后台管理平台
> A Vue.js project
* 创建时间：2018年3月6日
* 创建人：陈兴旭
* 开发环境：WebStorm+ES6+WebPack+Gulp+Vue+Vuex+Vue-router+Axios+Element-UI+Scss

## 安装使用
* 第一步：下载安装node.js
* 第二步：在命名行工具中进入项目所在目录，然后依次运行如下bash命令
```
# 安装依赖
npm install
# 全局安装gulp
npm install gulp -g
# gulp命令可一次性执行所有的编译、打包、监视、服务器运行等..（开发时使用）
gulp
# 打包压缩，生成项目最后文件（生产时使用）
gulp build
...... 其它命令请参考gulpfile.js

* 第三步：使用开发工具WebStorm打开项目，继续开发

## 项目目录结构
```
.
├── buld ---------------- 编译生成后临时目录
├── dist ---------------- 项目生产时打包资源存放目录
├── src ----------------- 主要代码目录
|   ├── api ------------- 项目API目录：axios
|   ├── components ------ Vue/Element-UI组件目录
|   ├── js -------------- 项目js目录(通用库等等)
|   ├── router ---------- vue-router路由目录
|   ├── sass ------------ SASS/SCSS源代码目录
|   ├── store ----------- vuex状态管理仓库
|   ├── index.html ------ 首页
|   └── index.js -------- 项目主入口js
├── static -------------- 静态资源目录
|   ├── css ------------- 样式表目录
|   ├── icon ------------ 图标目录
|   └── images ---------- 图片目录
├── .babelrc ------------ babel编译配置文件
├── .editorconfig ------- WebStorm代码格式化配置文件
├── gulpfile.js --------- gulp配置文件
├── index.html ---------- 首页（编译后实际可用的）
├── package.json -------- npm配置文件
├── package-lock.json --- npm命令生成的配置文件
├── README.md ----------- 说明文件
└── webpack.config ------ webpack配置文件
```
