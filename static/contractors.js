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
    'fullname', 'email'
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
        var btn = d3.event.target;
        console.log(btn, d);
      })
    )
  }];

  window.contractors = setupTable('Contractors', header, actions,
    fields, validations, defaultRow);
})();
