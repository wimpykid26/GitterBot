'use strict'
const request = require('request');
//const constants = require('../constants');


  const create_new_repo = (callback, username) => {
    request({
      url: 'https://api.github.com/repos/GDG-JIIT/Impressions-2017/issues',
      headers: {
        'Authorization': 'token c2c5d31a1b817bdabea1a554b928b7e458716e5a',
        'User-Agent': 'wimpykid26'
              },
      method : 'GET'
    }, (error, response, body) => {
      console.log(response)
      if (!error && response.statusCode === 200) {
        let message = '\n';
        const parsed = JSON.parse(body);
        console.log('ahysvdyuavsd');
        parsed.list.forEach((listItem) => {
          message += `* ${listItem.title}\n\n**Example**\n\n`;
          message += `> ${listItem.body}\n\n  `;

        });
        callback(message, username);
      }
    });
  }


create_new_repo("mayank");

// DEFINE_CREATE_REPO : https://api.github.com/repos/GDG-JIIT/Impressions-2017/issues
//
