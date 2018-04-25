'use strict';
(() => {
  document.querySelector('#manage-contracts-open').addEventListener('click', () => {
    document.querySelector('#manage-contracts-space').style.display = '';
  });

  document.querySelector('#manage-contracts-space-close').addEventListener('click', () => {
    document.querySelector('#manage-contracts-space').style.display = 'none';
  });

  var contracts = [];
  var lastSTO;

  function doselect(row) {
    var found = contracts.find(d => d.id == row.id);
    if (!found) {
      contracts.push(row);
    }

    if (lastSTO) {
      clearTimeout(lastSTO);
    }
    lastSTO = setTimeout(() => {
      render();
    }, 300);
  }

  function render() {
    d3.select('table#manage-contracts-table tbody')
      .selectAll('tr').data(contracts).enter()
      .append('tr')
        .append('td').text(d => d.title);
  }

  window.contractList = {
    doselect: doselect
  };
})();
