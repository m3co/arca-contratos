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
  const validations = {
    status: { required: true },
    title: { required: true }
  };

  var newEntry = setupDefault(defaultRow);
  const fields = [
    'title',
    {
      name: 'status',
      list: 'contract-status'
    }
  ];
  fields[Symbol.for('validations')] = validations;

  setTimeout(() => {
    var tb, tr;
    d3.select('table#contracts thead tr')
      .selectAll('th').data(['Titulo', 'Estado', '-', 'Ir'])
      .enter().append('th').text(d => d);

    // NEW-ENTRY
    tb = d3.select('table#contracts')
      .selectAll('tr.new-contract')
      .data(newEntry);

    tr = tb.enter().append('tr').classed('new-contract', true);
    setupRedacts('Contracts', 'id', fields, tr, 'insert');
  }, 0);

  function render() {
    var tb;
    var tr;

    // SELECT
    tb = d3.select('table#contracts tbody')
      .selectAll('tr.contract').data(contracts);

    // EXIT
    tb.exit().remove();

    // UPDATE
    updateTbody(tb, validations);
    tb.select('button.show')
      .on('click', d => {
        var btn = d3.event.target;
        console.log(btn, d, 'now what');
      });

    // ENTER
    tr = tb.enter().append('tr').classed('contract', true);
    setupRedacts('Contracts', 'id', fields, tr);
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

    tr.append('td').append('button')
      .text('->')
      .classed('show', true)
      .attr('idkey', 'id')
      .on('click', d => {
        var btn = d3.event.target;
        console.log(btn, d);
      });

    // MOVE NEW-ENTRY TO THE BOTTOM
    tb = d3.select('table#contracts')
      .selectAll('tr.new-contract')
      .data(newEntry);

    tb.select('span')
      .text((d, i, m) => renderText(d[m[i].getAttribute('key')]));

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
