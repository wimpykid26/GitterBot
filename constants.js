'use strict';
const config = require('./config');

const ROOM_ID = config.roomId;
const TOKEN = config.token;
const BOT_MENTION_NAME = '@gdg-bot';
const META_HANDSHAKE_SUFFIX_URL = '/meta/handshake';
const FAYE_CLIENT_URL = 'https://ws.gitter.im/faye';
const CHATROOM_SUFFIX_URL = `/v1/rooms/${ROOM_ID}/chatMessages`;
const CLIENT_SUBSCRIBE_URL = `/api${CHATROOM_SUFFIX_URL}`;
const CHATROOM_URL = `https://api.gitter.im${CHATROOM_SUFFIX_URL}`;

module.exports = {
  BOT_MENTION_NAME,
  ROOM_ID,
  TOKEN,
  META_HANDSHAKE_SUFFIX_URL,
  FAYE_CLIENT_URL,
  CHATROOM_SUFFIX_URL,
  CLIENT_SUBSCRIBE_URL,
  CHATROOM_URL,
}
