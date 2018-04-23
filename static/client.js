'use strict';
((io) => {
  var client = io();
  client.on('connect', () => {
    console.log('connection');

    client.emit('data', {
      query: 'select',
      module: 'fnContractsAPU',
      parent: '2'
    });

  });

  client.on('response', (data) => {
    var query = data.query;
    if (data.row) {
      doselect(data.row);
    }
  });
  window.client = client;
})(io);
