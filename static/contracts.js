'use strict';
(() => {
  var contracts = [];
  var lastSTO;

  function doselect(row) {
    var found = contracts.find(d => d.id == row.id);
    if (found) {

    } else {
      contracts.push(row);
    }

    if (lastSTO !== undefined) {
      clearTimeout(lastSTO);
    }

    lastSTO = setTimeout(() => {
      render();
    }, 100);
  }

  function render() {
    var tb = d3.select('table#contracts').selectAll('tr.contract').data(contracts);
    var tr = tb.enter().append('tr').classed('contract', true);
    tr.append('td').text(d => d.status);
    tr.append('td').text(d => d.title);
  }

  window.contracts = {
    doselect: doselect
  };
})();
