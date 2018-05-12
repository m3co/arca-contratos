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
        /*
        d3.select('table#ContractRecords').attr('hidden', '');
        */
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
        d3.select('table#ContractRecords').attr('hidden', null);
        window.records.clear({
          ContractId: d.ContractId
        });
        client.emit('data', {
          query: 'select',
          module: 'ContractRecords',
          ContractId: d.ContractId
        });
      })
    )
  }];

  window.contracts = setupTable('viewContractContractors', header, actions,
    fields, 'id', validations, defaultRow);
})();
