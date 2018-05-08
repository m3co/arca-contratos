'use strict';
(() => {
  var contractors = [];
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
    var found = contractors.find(d => d.id == row.id);
    if (found) {
      Object.keys(found).forEach(key => {
        found[key] = row[key];
      });
      bounceRender();
    }
  }

  function doselect(row) {
    var found = contractors.find(d => d.id == row.id);
    if (!found) {
      contractors.push(row);
      bounceRender();
    }
  }

  function doinsert(row) {
    newEntry = setupDefault(defaultRow);
    doselect(row);
  }

  function dodelete(row) {
    var foundIndex = contractors.findIndex(d => d.id == row.id);
    if (foundIndex > -1) {
      contractors.splice(foundIndex, 1);
      bounceRender();
    }
  }

  const defaultRow = {
    email: '',
    fullname: ''
  };
  const validations = {
    email: { required: true },
    fullname: { required: true }
  };

  var newEntry = setupDefault(defaultRow);
  const fields = [
    'email', 'fullname'
  ];
  fields[Symbol.for('validations')] = validations;

  setTimeout(() => {
    d3.select('table#contractors thead tr')
      .selectAll('th').data(['Titulo', 'Estado', '-', 'Ir'])
      .enter().append('th').text(d => d);
  }, 0);

  function render() {
    var tb;
    var tr;

    // SELECT
    tb = d3.select('table#contractors tbody')
      .selectAll('tr.contract').data(contractors);

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

    // NEW-ENTRY
    tb = d3.select('table#contractors')
      .selectAll('tr.new-contract')
      .data(newEntry);

    tb.select('span')
      .text((d, i, m) => renderText(d[m[i].getAttribute('key')]));
    // Aqui hace falta hacer actualizar la forma...

    tr = tb.enter().append('tr').classed('new-contract', true);
    setupRedacts('Contracts', 'id', fields, tr, 'insert');

    // MOVE NEW-ENTRY TO THE BOTTOM
    d3.select('table#contractors tr.new-contract').each(function() {
      this.parentElement.appendChild(this);
    });
  }

  window.contractors = {
    doselect: doselect,
    doupdate: doupdate,
    dodelete: dodelete,
    doinsert: doinsert
  };
})();
