'use strict';
(() => {
  const defaultRow = {
    email: '',
    fullname: ''
  };
  const validations = {
  };

  const fields = [
    'title', 'AAUId', 'constrain',
    'Qtakeoff_qop', 'preAPU_qop', 'qop'
  ];

  const header = ['Acta', 'Codigo', 'Limitante', 'Requerido', 'Contratado', 'Asignado', '-'];
  const actions = [{
    select: 'button.asign_qop',
    setup: (selection => selection
      .text('-')
      .classed('asign_qop', true)
      .on('click', d => {
        /*
        client.emit('data', {
          query: 'update',
          module: 'APUTodo',
          id: d.id,
          idkey: 'id'
        });
        */
      })
  )}];

  window.aputodo = setupTable({
    filter: { value: 'APUTodo', key: 'table' },
    module: 'APUTodo',
    header: header,
    actions: actions,
    fields: fields,
    idkey: 'id',
    validations: validations,
    defaultRow: defaultRow,
    preventNewEntry: true
  });
})();
