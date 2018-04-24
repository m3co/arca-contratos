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
    console.log('rendering', contents);
  }

  window.content = {
    doselect: doselect,
    request: (d) => {
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
