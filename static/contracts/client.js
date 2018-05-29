'use strict';
((io) => {
  var client = io();
  client.on('connect', () => {
    console.log('connection');

    client.emit('data', {
      query: 'subscribe',
      module: 'viewContractContractors'
    });

    client.emit('data', {
      query: 'subscribe',
      module: 'Contractors'
    });

    client.emit('data', {
      query: 'subscribe',
      module: 'ContractRecords'
    });

    client.emit('data', {
      query: 'select',
      module: 'Contractors'
    });
  });

  client.on('response', (data) => {
    var query = data.query;
    var row = data.row;
    var action;
    if (row) {
      if (data.module == 'Contractors') {
        action = contractors[`do${query}`];
        if (action) { action(row); }
        else {
          console.log('sin procesar Contractors', data);
        }
      } else if (data.module == 'ContractRecords') {
        action = records[`do${query}`];
        if (action) { action(row); }
        else {
          console.log('sin procesar ContractRecords', data);
        }
      } else if (data.module == 'viewContractContractors') {
        action = contracts[`do${query}`];
        if (action) { action(row); }
        else {
          console.log('sin procesar viewContractContractors', data);
        }
      } else {
        console.log('sin procesar', data);
      }
    }
  });
  window.client = client;
})(io);
