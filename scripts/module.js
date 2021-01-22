import HandRaiser from "./HandRaiser.mjs";

Hooks.on("chatCommandsReady", function(chatCommands) {
  game.socket.on("module.raise-my-hand", function(recieveMsg) {
    window.game.handRaiser.handleSocket(recieveMsg);
  });

  chatCommands.registerCommand(chatCommands.createCommand("/raisemyhand", false, (chatlog, messageText, chatdata) => {
    window.game.handRaiser.raise();
  }));

  chatCommands.registerCommand(chatCommands.createCommand("/lowermyhand", false, (chatlog, messageText, chatdata) => {
    window.game.handRaiser.lower();
  }));

  chatCommands.registerCommand(chatCommands.createCommand("/rmh", false, (chatlog, messageText, chatdata) => {
    window.game.handRaiser.raise();
  }));

  chatCommands.registerCommand(chatCommands.createCommand("/lmh", false, (chatlog, messageText, chatdata) => {
    window.game.handRaiser.lower();
  }));
});


Hooks.once('ready', function() {
  let moduleName = 'raise-my-hand';

  let handRaiser = new HandRaiser();
  window.game.handRaiser = handRaiser;

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

Hooks.on("getSceneControlButtons", function(controls) {
  let tileControls = controls.find(x => x.name === "token");
  tileControls.tools.push({
    icon: "fas fa-hand-paper",
    name: "raise-my-hand",
    title: "✋Raise My Hand",
    button: true,
    onClick: () => window.game.handRaiser.toggle()
  });
});
