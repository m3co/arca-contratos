'use strict';
((io) => {
  var client = io();
  client.on('connect', () => {
    console.log('connection');

    client.emit('data', {
      query: 'select',
      module: 'APU',
      project: '2'
    });

  });

  client.on('response', (data) => {
    var query = data.query;
    if (data.row) {
      console.log(data.row);
    }
  });
  window.client = client;
})(io);
