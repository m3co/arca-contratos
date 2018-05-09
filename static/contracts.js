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

  window.contracts = setupTable(fields, validations, defaultRow);
})();
