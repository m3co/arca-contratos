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
      if (data.module == 'fnContractsAPU') {
        contract.doselect(data.row);
      } else if (data.module == 'viewContractsAPU') {
        content.doselect(data.row);
      } else if (data.module == 'Contracts') {
        contractList.doselect(data.row);
      } else {
        console.log('sin procesar', data.row);
      }
    }
  });
  window.client = client;
})(io);