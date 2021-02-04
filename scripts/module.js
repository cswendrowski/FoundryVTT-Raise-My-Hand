import HandRaiser from "./HandRaiser.mjs";

Hooks.on("chatCommandsReady", function(chatCommands) {
  game.socket.on("module.raise-my-hand", function(recieveMsg) {
    window.game.handRaiser.handleSocket(recieveMsg);
  });

  chatCommands.registerCommand(chatCommands.createCommandFromData({
    commandKey: "/raisemyhand",
    invokeOnCommand: (chatlog, messageText, chatdata) => {
      window.game.handRaiser.raise();
    },
    shouldDisplayToChat: false,
    iconClass: "fa-hand-paper",
    description: "Show raised hand indicator"
  }));

  chatCommands.registerCommand(chatCommands.createCommandFromData({
    commandKey: "/lowermyhand",
    invokeOnCommand: (chatlog, messageText, chatdata) => {
      window.game.handRaiser.lower();
    },
    shouldDisplayToChat: false,
    iconClass: "fa-hand-paper",
    description: "Lower raised hand indicator"
  }));

  chatCommands.registerCommand(chatCommands.createCommandFromData({
    commandKey: "/rmh",
    invokeOnCommand: (chatlog, messageText, chatdata) => {
      window.game.handRaiser.raise();
    },
    shouldDisplayToChat: false,
    iconClass: "fa-hand-paper",
    description: "Show raised hand indicator"
  }));

  chatCommands.registerCommand(chatCommands.createCommandFromData({
    commandKey: "/lmh",
    invokeOnCommand: (chatlog, messageText, chatdata) => {
      window.game.handRaiser.lower();
    },
    shouldDisplayToChat: false,
    iconClass: "fa-hand-paper",
    description: "Lower raised hand indicator"
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
