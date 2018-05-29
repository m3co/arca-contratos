'use strict';
((io) => {
  var client = io();
  client.on('connect', () => {
    console.log('connection');

  });

  client.on('response', (data) => {
    var query = data.query;
    var row = data.row;
    var action;
    if (row) {
      if (data.module == 'preAPUContractRecords') {
      } else {
        console.log('sin procesar', data);
      }
    }
  });
  window.client = client;
})(io);
