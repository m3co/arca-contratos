'use strict';
(() => {
  const defaultRow = {
    status: 'negotiations',
    title: ''
  };
  const validations = {
    status: { required: true },
    title: { required: true }
  };

  const fields = [
    'title',
    {
      name: 'status',
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
          module: 'Contracts',
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

  window.contracts = setupTable('Contracts', header, actions,
    fields, 'id', validations, defaultRow);
})();
