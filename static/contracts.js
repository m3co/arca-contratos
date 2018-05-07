'use strict';
(() => {
  var contracts = [];
  var lastSTO;

  function bounceRender() {
    if (lastSTO !== undefined) {
      clearTimeout(lastSTO);
    }
    lastSTO = setTimeout(() => {
      render();
    }, 100);
  }

  function doupdate(row) {
    var found = contracts.find(d => d.id == row.id);
    if (found) {
      Object.keys(found).forEach(key => {
        found[key] = row[key];
      });
      bounceRender();
    }
  }

  function doselect(row) {
    var found = contracts.find(d => d.id == row.id);
    if (!found) {
      contracts.push(row);
      bounceRender();
    }
  }

  function render() {
    var tb = d3.select('table#contracts').selectAll('tr.contract').data(contracts);

    tb.selectAll('span')
      .text((d, i, m) => d[m[i].getAttribute('key')]);
    tb.selectAll('input[name="value"]')
      .attr('value', (d, i, m) => d[m[i].getAttribute('key')]);
    tb.selectAll('input[name="id"]')
      .attr('value', (d, i, m) => d[m[i].getAttribute('idkey')]);

    tb.exit().remove();
    var tr = tb.enter().append('tr').classed('contract', true);
    tr.append('td').call(setupRedact('id', 'title', 'Contracts'));
    tr.append('td').call(setupRedact('id', 'status', 'Contracts'));
  }

  window.contracts = {
    doselect: doselect,
    doupdate: doupdate
  };
})();
