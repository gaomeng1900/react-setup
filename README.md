# React Setup 2024

Pretty lite setup for React projects in 2024.
Focus on simplicity, performance and paradigms.

## Quick Start

- `npm ci`
- `npm start`
- Check your browser

## Development

#### Environment

- node >= 20
- npm >= 9

VS Code is recommended for development.

- Use newer version of vs code
- 安装推荐插件（打开本项目时会提示），务必安装 prettier 和 eslint 插件
- Use workspace version of typescript. 将 ts 设置为工程中的版本，而非 vscode 内置版本
  1.  `npm ci`
  2.  打开工程中的任意 ts 或 tsx 文件
  3.  点击右下角 typescript 版本，切换为 `use workspace version`

> - 如果使用其他编辑器，请务必确认 prettier/eslint/husky 工作正常。
> - Use some kind of copilot. Please.

#### 代码结构

参照 [bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) 的规范

- `src`

  - `app` 根组件、全局样式、根Provider
  - `pages` 路由与页面结构（不含业务逻辑）
  - `features` 所有业务逻辑，封装成业务组件放这里，按人员分工和功能模块划分目录
  - `components` 公共组件，不含业务逻辑
  - `utils` 工具函数
  - `types` 全局类型
  - `assets` 静态资源
  - `config` 配置文件

**约定**

- 引用 `src` 下其他文件夹时，使用 `@` 作为 `src` 的别名，如 `@/components` `@/features`。
- 依赖方向必须为 `pages` -> `features` -> `components`，不能反向依赖。
- 不要在 page 以外的目录控制路由。

## Code Conduct

#### 工作流

- 务必启用 prettier 的自动格式化
- 严格执行 eslint 和 prettier，禁止绕过 commit 钩子
- git commit 格式应符合 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
  - 格式为 feat|fix|docs|style|refactor|perf|chore(模块): xxx
- 严格执行 code review

#### 依赖

- 引入任何依赖前先咨询管理员，要检查协议、体积、质量、二级依赖
- 使用 web 标准，禁止 jQ lodash ajax axios socketIO 等老旧三方库
- 避免任何非必需 polyfill

#### React

- HTML 标签应该语义化（使用 header main footer nav section标签）
- 样式全部使用 css module，支持嵌套，禁止 global（全局样式放 index.css 中）
- 除 ErrorBoundary 外，不要使用 React 类组件
- context 或者 state 中的复杂对象，应使用 immer 变成不可变对象
- 不要无视任何 eslint 对 react hooks 的 warning
- 公共 components 中的组件需要满足以下条件
  - 能够提供稳定接口
  - 功能固定
  - 不依赖 components 外的文件，不依赖 router，不依赖接口

#### 命名

- 目录和文件名使用小写字母，多个单词使用 `-` 分隔，用英文描述性命名
- React 组件用大驼峰命名
- 仅 export 一个 React 组件的文件，用组件名或 index 作为文件名
- 仅包含一个组件的目录，用组件名作为目录名
- React 组件的 css 与 tsx 同名
