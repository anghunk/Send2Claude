const vscode = require('vscode');

function activate(context) {
    // 命令：从编辑器右键调用
    let editorDisposable = vscode.commands.registerCommand('send2claude.sendFromEditor', function (args) {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            return;
        }

        const document = editor.document;

        // 检查是否有选中的文本
        const hasSelection = editor.selections && editor.selections.some(sel => !sel.isEmpty);

        if (hasSelection) {
            // 有选中：复制文件路径 + 行号
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
            if (!workspaceFolder) {
                return;
            }

            const relativePath = vscode.workspace.asRelativePath(document.uri);
            const firstSelection = editor.selections.find(sel => !sel.isEmpty);
            const startLine = firstSelection.start.line + 1;
            let endLine = firstSelection.end.line + 1;

            if (firstSelection.end.character === 0 && firstSelection.end.line > firstSelection.start.line) {
                endLine = firstSelection.end.line;
            }

            let result;
            if (startLine === endLine) {
                result = `@${relativePath}:${startLine} `;
            } else {
                result = `@${relativePath}:${startLine}-${endLine} `;
            }

            vscode.env.clipboard.writeText(result);
        } else {
            // 无选中：只复制文件路径
            const relativePath = vscode.workspace.asRelativePath(document.uri);
            const result = `@${relativePath} `;
            vscode.env.clipboard.writeText(result);
        }
    });

    // 命令：从资源管理器右键调用
    let explorerDisposable = vscode.commands.registerCommand('send2claude.sendFromExplorer', function (uri) {
        if (!uri) {
            return;
        }

        const relativePath = vscode.workspace.asRelativePath(uri);
        const result = `@${relativePath} `;

        vscode.env.clipboard.writeText(result);
    });

    context.subscriptions.push(editorDisposable);
    context.subscriptions.push(explorerDisposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
