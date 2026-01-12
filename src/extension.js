const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('send2claude.send', function (uri) {
        // 场景1：从资源管理器右键调用（有uri参数）
        if (uri) {
            const relativePath = vscode.workspace.asRelativePath(uri);
            const result = `@${relativePath}`;
            vscode.env.clipboard.writeText(result).then(() => {
                vscode.window.showInformationMessage(`Copied: ${result}`);
            });
            return;
        }

        // 场景2：从编辑器调用（无uri参数）
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showWarningMessage('No active editor');
            return;
        }

        const document = editor.document;
        const selection = editor.selection;

        // 场景2a：选中了文本 → 复制文件路径和行号
        if (!selection.isEmpty) {
            // 获取工作区根路径
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
            if (!workspaceFolder) {
                vscode.window.showWarningMessage('File is not in a workspace');
                return;
            }

            // 计算相对路径
            const relativePath = vscode.workspace.asRelativePath(document.uri);

            // 获取选中行的范围（从1开始计数）
            const startLine = selection.start.line + 1;
            let endLine = selection.end.line + 1;

            // 修复：如果选中结束在某行的开头（character=0），且不是起始行，则减1
            if (selection.end.character === 0 && selection.end.line > selection.start.line) {
                endLine = selection.end.line;
            }

            // 格式化输出
            let result;
            if (startLine === endLine) {
                result = `@${relativePath}:${startLine}`;
            } else {
                result = `@${relativePath}:${startLine}-${endLine}`;
            }

            // 复制到剪贴板
            vscode.env.clipboard.writeText(result).then(() => {
                vscode.window.showInformationMessage(`Copied: ${result}`);
            });
        }
        // 场景2b：未选中文本（空白处右键）→ 只复制文件路径
        else {
            const relativePath = vscode.workspace.asRelativePath(document.uri);
            const result = `@${relativePath}`;
            vscode.env.clipboard.writeText(result).then(() => {
                vscode.window.showInformationMessage(`Copied: ${result}`);
            });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
