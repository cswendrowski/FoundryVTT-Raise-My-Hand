import HandRaiser from "./HandRaiser.mjs";

Hooks.on("chatCommandsReady", function(chatCommands) {

  let handRaiser = new HandRaiser();

  game.socket.on("module.raise-my-hand", function(recieveMsg) {
    handRaiser.handleSocket(recieveMsg);
  });

  chatCommands.registerCommand(chatCommands.createCommand("/raisemyhand", false, (chatlog, messageText, chatdata) => {
    handRaiser.raise();
  }));

  chatCommands.registerCommand(chatCommands.createCommand("/lowermyhand", false, (chatlog, messageText, chatdata) => {
    handRaiser.lower();
  }));

  chatCommands.registerCommand(chatCommands.createCommand("/rmh", false, (chatlog, messageText, chatdata) => {
    handRaiser.raise();
  }));

  chatCommands.registerCommand(chatCommands.createCommand("/lmh", false, (chatlog, messageText, chatdata) => {
    handRaiser.lower();
  }));
});


Hooks.once('ready', function() {
  let moduleName = 'raise-my-hand';

  game.settings.register(moduleName, "showEmojiIndicator", {
    name: "Should a raised hand be displayed in the Players list?",
    scope: 'world',
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(moduleName, "showUiNotification", {
    name: "Should a raised hand display a UI notification when raised?",
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  });
});
