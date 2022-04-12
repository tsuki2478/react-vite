## 作用说明：

**此项目主要是提供给 React 框架项目类模板.**

vite 插件的优化构建方式、

完善 eslint|prettier 规范、 

集成route-v6、mobx、antd、axios方案

优化方案可持续优化...

## 项目运行(yarn/npm)

**依赖安装**：

运行 yarn/npm 安装 web 端依赖

**本地开发**：

运行 yarn dev 启动应用

**构建项目**：

运行 yarn build 进行 web 端构建

**代码检测**：

运行 yarn eslint 进行代码检测

**代码格式化**：

运行 yarn fix 进行代码格式化

## 额外说明：

**Eslint**：

继承 airbnb，通过对 airbnb 部分规则覆写实现的一套规范, Prettier 格式化代码, 自动化检测提交。

**Commitizen**：

本项目已集成 commitizen，并使用基于 Angular Team 规范的 cz-conventional-changelog adapter。强烈推荐使用 commitizen 规范你的 commit message 格式，并学会把握每一次 commit 的范围，使你的每个 commit 都只专注于一个目标。

在项目根目录下运行 `npm i` 安装依赖后，

本地上安装：
npm install commitizen -g

项目内运行：
commitizen init cz-conventional-changelog --yarn --dev --exact

**commit 类型说明**：

-   build: 影响项目打包流程，或修改了外部依赖项 (example scopes: gulp, broccoli, npm)
-   ci: 修改 ci/cd 配置文件等影响持续构建流程的行为 (example scopes: Travis, Circle, BrowserStack, Gitlab CI，Dockerfile)
-   docs: 项目文档的修改
-   feat: 增加新的功能
-   fix: 修复已知 bug
-   perf: 提升项目性能的修改
-   refactor: 既不是添加新功能，也不是修复 bug 的代码修改，一般是一些实现流程重写
-   style: 源码的代码风格调整，不是指样式文件修改！ (white-space, formatting, missing semi-colons, etc)
-   test: 测试代码相关的修改

**公共组件**：

-   MyModal、RangePicker 组件：与呱呱音乐 Admin 的 Modal、RangePicker 用法一致
-   SearchForm 组件：用于页面的搜索表单；
