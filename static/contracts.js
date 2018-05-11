'use strict';
(() => {
  const defaultRow = {
    Contracts_status: 'negotiations',
    Contracts_title: ''
  };
  const validations = {
    Contracts_status: { required: true },
    Contracts_title: { required: true }
  };

  const fields = [
    'Contracts_title',
    {
      name: 'Contracts_status',
      list: 'contract-status'
    }
  ];

  const header = ['Titulo', 'Estado', '-', 'Ir'];
  const actions = [{
    select: 'button.delete',
    setup: (selection => selection
      .text('-')
      .classed('delete', true)
      .on('click', d => {
        client.emit('data', {
          query: 'delete',
          module: 'viewContractContractors',
          id: d.id,
          idkey: 'id'
        });
      })
  )}, {
    select: 'button.show',
    setup: (selection => selection
      .text('->')
      .classed('show', true)
      .on('click', d => {
        var btn = d3.event.target;
        console.log(btn, d);
      })
    )
  }];

  window.contracts = setupTable('viewContractContractors', header, actions,
    fields, 'id', validations, defaultRow);
})();
