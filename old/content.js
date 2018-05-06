'use strict';
(() => {
  var contents = [];
  window.contents = contents;
  var lastSTO;

  function doselect(row) {
    var APU = {
      id: row.id,
      APU_description: row.APU_description,
      APU_unit: row.APU_unit,
      is_estimated: row.is_estimated,
      cost: row.cost,
      contents: [row]
    };
    var found;
    found = contents.find(d => d.id == APU.id);
    if (found) {
      found.contents.push(row);
    } else {
      contents.push(APU);
    }

    if (lastSTO) {
      clearTimeout(lastSTO);
    }
    lastSTO = setTimeout(() => {
      render();
    }, 300);
  }

  function render() {
    var ct = d3.select('div.blocks').selectAll('table').data(contents);
    var tb = ct.enter().append('table');
    var th = tb.append('thead');
    var tr = th.append('tr');
    tr.append('td').text(d => d.id);
    tr.append('td').text(d => d.APU_description).attr('colspan', 2);
    tr.append('td').text(d => `$${d.cost}/${d.APU_unit}`);

    tr = th.append('tr');
    tr.append('th').text('Lugar');
    tr.append('th').text('Insumo');
    tr.append('th').text('Cantidad');
    tr.append('th').text('Contrato');

    var ty = tb.append('tbody').selectAll('tr').data(d => d.contents).enter();
    tr = ty.append('tr');
    tr.append('td').text(d => d.constrain);
    tr.append('td').text(d => d.Supplies_description);
    tr.append('td').text(d =>
      `${d.ContractsAPUSupplies_qop ?
        d.ContractsAPUSupplies_qop : 0} / ${d.Qtakeoff_qop}`);
    tr.append('td').text(d => d.title);
  }

  window.content = {
    doselect: doselect,
    request: function request(d) {
      [...document.querySelectorAll('ol.tree li.active')]
        .forEach(d => d.classList.remove('active'));
      this.closest('li').classList.add('active');
      contents.length = 0;
      d3.select('div.blocks').html('');
      client.emit('data', {
        query: 'select',
      module: 'viewContractsAPU',
      parent: d.id
      });
    }
  };
})();
