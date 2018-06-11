'use strict';
((io) => {
  var client = io();
  client.on('connect', () => {
    console.log('connection');

    client.emit('data', {
      query: 'subscribe',
      module: 'viewAPUTodo'
    });

    client.emit('data', {
      query: 'select',
      module: 'viewAPUTodo'
    });
  });

  client.on('response', (data) => {
    var query = data.query;
    var row = data.row;
    var action;
    if (row) {
      if (data.module == 'viewAPUTodo') {
        action = aputodo[`do${query}`];
        if (action) { action(row); }
        else {
          console.log('sin procesar viewAPUTodo', data);
        }
      } else {
        console.log('sin procesar', data);
      }
    }
  });
  window.client = client;
})(io);
