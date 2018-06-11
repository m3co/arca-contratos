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
      .text('Asignar')
      .classed('asign_qop', true)
      .on('click', d => {
        client.emit('data', {
          query: 'update',
          module: 'viewAPUTodo',
          id: d.id,
          idkey: 'id',
          key: 'qop',
          value: null
        });
      })
  )}];

  window.aputodo = setupTable({
    filter: { value: 'viewAPUTodo', key: 'table' },
    module: 'viewAPUTodo',
    header: header,
    actions: actions,
    fields: fields,
    idkey: 'id',
    validations: validations,
    defaultRow: defaultRow,
    preventNewEntry: true
  });
})();
