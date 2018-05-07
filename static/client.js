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
      query: 'subscribe',
      module: 'Contractors'
    });

    client.emit('data', {
      query: 'select',
      module: 'Contractors'
    });
  });

  client.on('response', (data) => {
    var query = data.query;
    if (data.row) {
      if (data.module == 'Contracts') {
        if (data.query == 'select') {
          contracts.doselect(data.row);
        } else if (data.query == 'update') {
          contracts.doupdate(data.row);
        } else if (data.query == 'delete') {
          contracts.dodelete(data.row);
        } else if (data.query == 'insert') {
          contracts.doinsert(data.row);
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
