'use strict';
const constants = require('./constants');
const Faye = require('faye');

const getClientAuthExt = () => {
  const incoming = (message, callback) => {
    if (message.channel === constants.META_HANDSHAKE_SUFFIX_URL) {
      if (message.successful) {
        console.log('Successfuly subscribed to room: ', constants.ROOM_ID);
      }
      else {
        console.log('Something went wrong: ', message.error);
      }
    }
    callback(message);
  };

  const outgoing = (message, callback) => {
    if (message.channel === constants.META_HANDSHAKE_SUFFIX_URL) {
      if (!message.ext) { message.ext = {}; }
      message.ext.token = constants.TOKEN;
      console.log(message.ext.token);
    }
    callback(message);
  };

  return {
    outgoing,
    incoming
  };
};

const client = new Faye.Client(constants.FAYE_CLIENT_URL, {
  timeout: 60,
  retry: 5,
  interval: 1
});
// Create and add the Client Authentication extension.

client.addExtension(getClientAuthExt());
client.subscribe(constants.CLIENT_SUBSCRIBE_URL, (msg) => {
  console.log("Asdvasyudv");
  if (msg.model && msg.model.fromUser) {
    console.log('Message: ', msg.model.text);
    console.log('From: ', msg.model.fromUser.displayName);
    //replyToUser(msg.model.fromUser, msg.model.text);
  }
  else {
    console.log("Something went wrong");
  }
}, {});
