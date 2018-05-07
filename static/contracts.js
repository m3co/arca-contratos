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

  function setupRedact(id, key, module, query = 'update') {
    return function redact(selection) {
      selection.append('span')
        .text(d => d[key])
        .attr('key', key)
        .on('click', d => {
          var e = d3.event;
          e.preventDefault();

          var span = e.target;
          var form = span.parentElement.querySelector('form');
          span.hidden = true;
          form.hidden = false;
        });

      var form = selection.append('form')
        .attr('hidden', '')
        .on('submit', d => {
          var e = d3.event;
          e.preventDefault();

          var form = e.target;
          var span = form.parentElement.querySelector('span');
          form.hidden = true;
          span.hidden = false;

          var fd = new FormData(form).toJSON();
          fd.key = [fd.key];
          fd.value = [fd.value];
          fd.query = query;
          fd.module = module;
          client.emit('data', fd);
        });

      form.append('input')
        .attr('name', 'value')
        .attr('key', key)
        .attr('value', d => d[key]);

      form.append('input')
        .attr('name', 'idkey')
        .attr('value', id)
        .attr('type', 'hidden');

      form.append('input')
        .attr('name', 'key')
        .attr('value', key)
        .attr('type', 'hidden');

      form.append('input')
        .attr('name', 'id')
        .attr('idkey', id)
        .attr('value', d => d[id])
        .attr('type', 'hidden');
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
