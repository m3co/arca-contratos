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

  const header = ['Acta', 'Contrato', 'Contratista', '-'];
  const actions = [{
    select: 'button.show',
    setup: (selection => selection
      .text('->')
      .classed('show', true)
      .on('click', d => {
        document.querySelector('#ContractRecordId').value = d.ContractRecordId;
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
