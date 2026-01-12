# Send2Claude

[![Version](https://img.shields.io/visual-studio-marketplace/v/anghunk.send2claude)](https://marketplace.visualstudio.com/items?itemName=anghunk.send2claude)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/anghunk.send2claude)](https://marketplace.visualstudio.com/items?itemName=anghunk.send2claude)

一个 VSCode 扩展，用于快速将代码文件路径或选中的代码片段行数发送给 Claude Code 进行分析和讨论。

## 使用方法

在编辑器或文件资源管理器中右键，选择 `Send to Claude Code`，插件会生成以下格式的引用字符串，可直接粘贴到 Claude Code 对话中：

- **选中代码后右键** → 复制 `@文件路径:行号`（如 `@src/main.js:10-20`）
- **空白处右键** → 复制 `@文件路径`（如 `@src/main.js`）
- **文件树右键** → 复制 `@文件路径`（如 `@src/main.js`）

## License

[Apache License 2.0](./LICENSE)
