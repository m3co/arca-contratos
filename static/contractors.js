'use strict';
(() => {
  const defaultRow = {
    email: '',
    fullname: ''
  };
  const validations = {
    email: { required: true },
    fullname: { required: true }
  };

  const fields = [
    'email', 'fullname'
  ];

  const header = ['Email', 'Nombre completo', '-', 'Ir'];
  const actions = [{
    select: 'button.delete',
    setup: (selection => selection
      .text('-')
      .classed('delete', true)
      .on('click', d => {
        client.emit('data', {
          query: 'delete',
          module: 'Contractors',
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
        d3.select('table#Contracts').attr('hidden', null);
        client.emit('data', {
          query: 'select',
          module: 'viewContractContractors',
          ContractorId: d.id
        });
      })
    )
  }];

  window.contractors = setupTable('Contractors', header, actions,
    fields, 'id', validations, defaultRow);
})();
