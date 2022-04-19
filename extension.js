const { commands } = require("vscode");
const dictionary = require("./src/dictionary");
const toCyrillic = require("./src/to-cyrillic");

function activate(context) {
  let dictionaryCommand = commands.registerCommand(
    "latin-to-cyrillic.dictionary",
    dictionary
  );
  const toCyrillicCommand = commands.registerCommand("latin-to-cyrillic.to-cyrillic", toCyrillic);

  context.subscriptions.push(toCyrillicCommand);
  context.subscriptions.push(dictionaryCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
