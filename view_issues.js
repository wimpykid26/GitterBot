'use strict'
const request = require('request');
//const constants = require('../constants');


  const create_new_repo = (callback, username) => {
    request({
      uri: 'https://api.github.com/repos/GDG-JIIT/Impressions-2017/issues',
      headers: {
        'Authorization': 'token 96a9dc2b9e11e80ca01d1ced6550e3d8cba5c867'
              },
      method : 'GET'
    }, (error, response, body) => {
      console.log(response.statusCode)
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

