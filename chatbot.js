'use strict';
/* eslint-disable no-console */

const constants = require('./constants');
const DEPLOY_FLAG = process.env.DEPLOY;
const TEST_FLAG = process.env.TEST;

const getClientAuthExt = () => {
  const incoming = (message, callback) => {
    if (message.channel === constants.META_HANDSHAKE_SUFFIX_URL) {
      if (message.successful) {
        console.log('Successfuly subscribed to room: ', constants.ROOM_ID);
        if (DEPLOY_FLAG) {
          api.postBotReply('Deployment Successful');
        }
      } else {
        console.log('Something went wrong: ', message.error);
      }
    }
    callback(message);
  };

  const outgoing = (message, callback) => {
    if (message.channel === constants.META_HANDSHAKE_SUFFIX_URL) {
      if (!message.ext) { message.ext = {}; }
      message.ext.token = constants.TOKEN;
    }
    callback(message);
  };

  return {
    outgoing,
    incoming
  };
};

if (TEST_FLAG) {
  // Run like an REPL for local testing.
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  const readFromStdin = () => {
    console.log(
      'Server running successfully. Type "@osdc-bot help" to get started..');
    rl.on('line', (line) => {
      replyToUser('testUser', line);
    });
  };
  readFromStdin();
} else {
  // Faye client
  const Faye = require('faye');
  const client = new Faye.Client(constants.FAYE_CLIENT_URL, {
    timeout: 60,
    retry: 5,
    interval: 1
  });
  // Create and add the Client Authentication extension.

  client.addExtension(getClientAuthExt());
  client.subscribe(constants.CLIENT_SUBSCRIBE_URL, (msg) => {
    if (msg.model && msg.model.fromUser) {
      console.log('Message: ', msg.model.text);
      console.log('From: ', msg.model.fromUser.displayName);

      replyToUser(msg.model.fromUser, msg.model.text);
    }
  }, {});
}
