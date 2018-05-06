'use strict';
((io) => {
  var client = io();
  client.on('connect', () => {
    console.log('connection');

    client.emit('data', {
      query: 'subscribe',
      module: 'Contracts'
    });

    client.emit('data', {
      query: 'select',
      module: 'Contracts'
    });
  });

  client.on('response', (data) => {
    var query = data.query;
    if (data.row) {
      if (data.module == 'Contracts') {
        if (data.query == 'select') {
          contracts.doselect(data.row);
        } else {
          console.log('sin procesar Contracts', data);
        }
      } else {
        console.log('sin procesar', data);
      }
    }
  });
  window.client = client;
})(io);
