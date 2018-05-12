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
    if (row) {
      if (data.module == 'Contractors') {
        if (query == 'select') {
          contractors.doselect(row);
        } else if (query == 'update') {
          contractors.doupdate(row);
        } else if (query == 'delete') {
          contractors.dodelete(row);
        } else if (query == 'insert') {
          contractors.doinsert(row);
        } else {
          console.log('sin procesar Contractors', data);
        }
      } else if (data.module == 'ContractRecords') {
        if (query == 'select') {
          records.doselect(row);
        } else if (query == 'update') {
          records.doupdate(row);
        } else if (query == 'delete') {
          records.dodelete(row);
        } else if (query == 'insert') {
          records.doinsert(row);
        } else {
          console.log('sin procesar ContractRecords', data);
        }
      } else if (data.module == 'viewContractContractors') {
        if (query == 'select') {
          contracts.doselect(row);
        } else if (query == 'update') {
          contracts.doupdate(row);
        } else if (query == 'delete') {
          contracts.dodelete(row);
        } else if (query == 'insert') {
          contracts.doinsert(row);
        } else {
          console.log('sin procesar viewContractContractors', data);
        }
      } else {
        console.log('sin procesar', data);
      }
    }
  });
  window.client = client;
})(io);
