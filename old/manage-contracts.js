'use strict';
(() => {
  document.querySelector('#manage-contracts-open').addEventListener('click', () => {
    document.querySelector('#manage-contracts-space').style.display = '';
  });

  document.querySelector('#manage-contracts-space-close').addEventListener('click', () => {
    document.querySelector('#manage-contracts-space').style.display = 'none';
  });

  document.querySelector('#add-contract').addEventListener('click', e => {
    if (document.querySelector('table#manage-contracts-table tbody input'))
      return;
    d3.select('table#manage-contracts-table tbody')
      .append('tr')
      .append('td').append('form')
        .on('submit', () => {
          d3.event.preventDefault();
          var title = d3.event.target.querySelector('input').value;
          client.emit('data', {
            query: 'insert',
            module: 'Contracts',
            row: {
              title: title
            }
          });
          d3.event.target.closest('tr').remove();
        })
        .append('input');
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

    d3.select('#select-contract')
      .selectAll('option').data(contracts).enter()
      .append('option').text(d => d.title).attr('value', d => d.id);
  }

  window.contractList = {
    doselect: doselect
  };
})();