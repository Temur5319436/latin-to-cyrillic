const vscode = require("vscode");
const axios = require("axios").default;

module.exports = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const text = editor.document.getText(editor.selection);

  try {
    const data = new URLSearchParams();
    data.append("keyword", text);
    data.append("names", "false");

    const { data: response } = await axios.post(
      process.env.DICTIONARY_SEARCH_URL,
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const quickPick = vscode.window.createQuickPick();
    quickPick.items = response.suggestions.map((label) => ({ label }));

    quickPick.onDidChangeSelection(([{ label }]) => {
      editor.edit((editBuilder) => {
        editBuilder.replace(editor.selection, label);
      });
      quickPick.hide();
    });

    quickPick.show();
  } catch (error) {
    vscode.window.showErrorMessage(error.message || "Xatolik sodir bo'ldi !");
  }
};
