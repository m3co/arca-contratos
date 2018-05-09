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

  window.contracts = setupTable('Contracts', header,
    fields, validations, defaultRow);
})();
