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

  var fields = ['email', 'fullname', 'identification', 'person'];
  const defaultRow = {
    email: '',
    fullname: '',
    identification: '',
    person: 'natural'
  };
  var newEntry = setupDefault(defaultRow);

  function render() {
    var tb;
    var tr;

    d3.select('table#contractors thead tr')
      .selectAll('th').data(['Email', 'Fullname', 'Identificacion', 'Tipo', '-', 'Ir'])
      .enter().append('th').text(d => d);
    tb = d3.select('table#contractors tbody')
      .selectAll('tr.contractor').data(contractors);

    updateTbody(tb);

    // ENTER
    tr = tb.enter().append('tr').classed('contractor', true);
    setupRedacts('Contractors', 'id', fields, tr);

    tr.append('td').append('button')
      .text('-')
      .classed('delete', true)
      .attr('id', d => d.id)
      .attr('idkey', 'id')
      .on('click', d => {
        var btn = d3.event.target;
        client.emit('data', {
          query: 'delete',
          module: 'Contractors',
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

    // EXIT
    tb.exit().remove();

    // NEW-ENTRY
    tb = d3.select('table#contractors')
      .selectAll('tr.new-contractor')
      .data(newEntry);

    tb.select('span')
      .text((d, i, m) => renderText(d[m[i].getAttribute('key')]));

    tr = tb.enter().append('tr').classed('new-contractor', true);
    setupRedacts('Contractors', 'id', fields, tr, 'insert');

    // MOVE NEW-ENTRY TO THE BOTTOM
    d3.select('table#contractors tr.new-contractor').each(function() {
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
