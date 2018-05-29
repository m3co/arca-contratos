'use strict';
(() => {
  const defaultRow = {
    ContractRecordId: 1
  };
  const validations = {
  };

  const fields = [
    'ContractRecordId', 'preAPUId', 'APUId'
  ];

  const header = [
    'Acta', 'Oferta', 'APU', ' '];

  const actions = [{
    select: 'button.delete',
    setup: (selection => selection
      .text('-')
      .classed('delete', true)
      .on('click', d => {
        client.emit('data', {
          query: 'delete',
          module: 'preAPUContractRecords',
          id: d.id,
          idkey: 'id'
        });
      })
  )}];

  window.preapucontractrecords = setupTable({
    module: 'preAPUContractRecords',
    header: header, actions: actions,
    fields: fields, idkey: 'id', validations: validations,
    defaultRow: defaultRow,
    filter: { key: 'table', value: 'preAPUContractRecords' }
  });

})();
