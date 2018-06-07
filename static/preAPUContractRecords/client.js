'use strict';
((io) => {
  var client = io();
  client.on('connect', () => {
    console.log('connection');

    client.emit('data', {
      query: 'subscribe',
      module: 'viewAAUpreAPUContractors'
    });

    client.emit('data', {
      query: 'select',
      module: 'viewContractRecordsContractors'
    });
  });

  client.on('response', (data) => {
    var query = data.query;
    var row = data.row;
    var action;
    if (row) {
      if (data.module == 'viewAAUpreAPUContractors') {
        action = preapucontractrecords[`do${query}`];
        if (action) { action(row); }
        else {
          console.log('sin procesar APU', data);
        }
      } else if (data.module == 'viewContractRecordsContractors') {
        action = records[`do${query}`];
        if (action) { action(row); }
        else {
          console.log('sin procesar Actas', data);
        }
      } else {
        console.log('sin procesar', data);
      }
    }
  });
  window.client = client;
})(io);
