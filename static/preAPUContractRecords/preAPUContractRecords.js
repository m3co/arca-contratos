'use strict';
(() => {
  const fields = [
    'qop', 'cost', 'duration',
    'description', 'unit', 'information',
    'fullname', 'person',
  ];

  var lastSTO;
  var aau = [];
  function doselect(row) {
    var found = aau.find(d => d.AAUId == row.AAUId);
    if (found) {
      found[Symbol.for('preAPU')].push(row);
    } else {
      var entry = {
        AAUId: row.AAUId,
        description: row.description,
        information: row.information,
        unit: row.unit,
      };
      entry[Symbol.for('preAPU')] = [row];
      aau.push(entry);
    }
    if (lastSTO) {
      clearTimeout(lastSTO);
    }
    lastSTO = setTimeout(() => render(), 300);
  }

  function render() {
    var trs, tr, td;
    trs = d3.select('#viewAAUpreAPUContractors tbody')
      .selectAll('tr.aau_row').data(aau);

    tr = trs.enter().append('tr').classed('aau_row', true);
    tr.append('td').append('table').selectAll('tr')
      .data(d =>
        ['AAUId', 'description', 'unit', 'information']
        .map(c => d[c]))
      .enter().append('tr').append('td').text(d => d);

    td = tr.append('td').append('table').append('tbody');
    trs = td.selectAll('tr.preapu_row')
      .data(d => d[Symbol.for('preAPU')]);
    tr = trs.enter().append('tr').classed('warning', d =>
        d.ContractorId != document.querySelector('#ContractorId').value.toString())
      .classed('preapu_row', true);

    tr.append('td').append('input')
      .attr('type', 'checkbox')
      .attr('disabled', d => d.blocked ?
          (d.ContractRecordId == document
            .querySelector('#ContractRecordId').value ? null : '') : null)
      .attr('checked', d => d.preAPUContractRecordId ? '' : null)
      .on('change', d => {
        document.querySelector('#ContractRecordId').value ? (
        d.ContractRecordId ?
          client.emit('data', {
            module: 'viewAAUpreAPUContractors',
            query: 'update',
            id: d.id,
            idkey: 'id',
            key: ['ContractRecordId'],
            value: [null]
          }) :
          client.emit('data', {
            module: 'viewAAUpreAPUContractors',
            query: 'update',
            id: d.id,
            idkey: 'id',
            key: ['ContractRecordId'],
            value: [document.querySelector('#ContractRecordId').value]
          })) : undefined;
      });

    tr.selectAll('td')
      .data(d => [''].concat(
        ['cost', 'duration', 'qop', 'fullname', 'person',
        'ContractRecords_title',
        'Contracts_title', 'Contracts_status']
        .map(c => d[c])))
      .enter().append('td').text(d => d);
  }

  window.preapucontractrecords = {
    doselect: doselect,
    clear: () => {
      document.querySelector('#viewAAUpreAPUContractors tbody').innerHTML = '';
      aau.length = 0;
    }
  };

})();
