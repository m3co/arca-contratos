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
        return; // please, don't delete anything by mistake
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
        document.querySelector('#ContractRecordId').value = d.id;
        window.preapucontractrecords.clear();
        client.emit('data', {
          query: 'select',
          module: 'viewAAUpreAPUContractors'
        });
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
