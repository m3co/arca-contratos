'use strict';

function setupRedact(id, key, module, query = 'update') {
  return function redact(selection) {
    selection.append('span')
      .text(d => d[key] ? (d[key].toString().trim() ? d[key] : '-') : '-')
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
      .on('submit', row => {
        var e = d3.event;
        e.preventDefault();

        var form = e.target;
        var span = form.parentElement.querySelector('span');
        form.hidden = true;
        span.hidden = false;

        var fd = new FormData(form).toJSON();
        if (query == 'update') {
          client.emit('data', {
            key: [fd.key],
            value: [fd.value],
            query: query,
            module: module
          });
        } else {
          row[fd.key] = fd.value;
          client.emit('data', {
            row: row,
            query: query,
            module: module
          });
        }
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

