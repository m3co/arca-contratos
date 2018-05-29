'use strict';
(() => {
  const defaultRow = {
    title: ''
  };
  const validations = {
    title: { required: true }
  };

  const fields = [
    'title'
  ];

  const header = ['Titulo', '-', 'Ir'];
  const actions = [{
    select: 'button.delete',
    setup: (selection => selection
      .text('-')
      .classed('delete', true)
      .on('click', d => {
        client.emit('data', {
          query: 'delete',
          module: 'ContractRecords',
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
        console.log('d', d);
      })
    )
  }];

  window.records = setupTable({
    filter: { key: 'table', value: 'ContractRecords' },
    module: 'ContractRecords',
    header: header,
    actions: actions,
    fields: fields,
    idkey: 'id',
    validations: validations,
    defaultRow: defaultRow
  });
})();
