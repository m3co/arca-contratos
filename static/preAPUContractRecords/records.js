'use strict';
(() => {
  const defaultRow = {
    title: ''
  };
  const validations = {
    title: { required: true }
  };

  const fields = [
    'ContractRecords_title', 'Contracts_title', 'Contractors_fullname'
  ];

  const header = ['Acta', 'Contrato', 'Contratista', '-', 'Ir'];
  const actions = [{
    select: 'button.delete',
    setup: (selection => selection
      .text('-')
      .classed('delete', true)
      .on('click', d => {
        return; // please, don't delete anything by mistake
        client.emit('data', {
          query: 'delete',
          module: 'viewContractRecordsContractors',
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
        document.querySelector('#ContractorId').value = d.ContractorId;
        window.preapucontractrecords.clear();
        client.emit('data', {
          query: 'select',
          module: 'viewAAUpreAPUContractors'
        });
      })
    )
  }];

  window.records = setupTable({
    filter: { key: 'table', value: 'viewContractRecordsContractors' },
    module: 'viewContractRecordsContractors',
    header: header,
    actions: actions,
    fields: fields,
    idkey: 'id',
    validations: validations,
    defaultRow: defaultRow
  });
})();
