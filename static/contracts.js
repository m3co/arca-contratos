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

  function doinsert(row) {
    newEntry = setupDefault(defaultRow);
    doselect(row);
  }

  function dodelete(row) {
    var foundIndex = contracts.findIndex(d => d.id == row.id);
    if (foundIndex > -1) {
      contracts.splice(foundIndex, 1);
      bounceRender();
    }
  }

  const defaultRow = {
    status: 'negotiations',
    title: ''
  };
  var newEntry = setupDefault(defaultRow);

  function render() {
    var tb;
    var tr;

    tb = d3.select('table#contracts').selectAll('tr.contract').data(contracts);
    // UPDATE
    tb.select('span')
      .text((d, i, m) => renderText(d[m[i].getAttribute('key')]));
    tb.select('input[name="value"]')
      .attr('value', (d, i, m) => d[m[i].getAttribute('key')]);
    tb.select('input[name="id"]')
      .attr('value', (d, i, m) => d[m[i].getAttribute('idkey')]);
    tb.select('button.delete')
      .attr('id', (d, i, m) => d[m[i].getAttribute('idkey')]);

    // ENTER
    tr = tb.enter().append('tr').classed('contract', true);
    tr.append('td').call(setupRedact('id', 'title', 'Contracts'));
    tr.append('td').call(setupRedact('id', 'status', 'Contracts'));
    tr.append('td').append('button')
      .text('-')
      .classed('delete', true)
      .attr('id', d => d.id)
      .attr('idkey', 'id')
      .on('click', d => {
        var btn = d3.event.target;
        client.emit('data', {
          query: 'delete',
          module: 'Contracts',
          id: btn.getAttribute('id'),
          idkey: btn.getAttribute('idkey')
        });
      });

    // EXIT
    tb.exit().remove();

    // NEW-ENTRY
    tb = d3.select('table#contracts')
      .selectAll('tr.new-contract')
      .data(newEntry);

    tb.select('span')
      .text((d, i, m) => renderText(d[m[i].getAttribute('key')]));

    tr = tb.enter().append('tr').classed('new-contract', true);
    tr.append('td').call(setupRedact('id', 'title', 'Contracts', 'insert'));
    tr.append('td').call(setupRedact('id', 'status', 'Contracts', 'insert'));

    // MOVE NEW-ENTRY TO THE BOTTOM
    d3.select('table#contracts tr.new-contract').each(function() {
      this.parentElement.appendChild(this);
    });
  }

  window.contracts = {
    doselect: doselect,
    doupdate: doupdate,
    dodelete: dodelete,
    doinsert: doinsert
  };
})();
