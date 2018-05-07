'use strict';
var renderText = t => t ? (t.toString().trim() ? t : '-') : '-';
function setupRedact(id, key, module, query = 'update') {
  return function redact(selection) {
    selection.append('span')
      .text(d => renderText(d[key]))
      .attr('key', key)
      .on('click', d => {
        var e = d3.event;
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
        var defaultrow = row[Symbol.for('defaultrow')];
        if (query == 'update') {
          client.emit('data', {
            id: fd.id,
            idkey: fd.idkey,
            key: [fd.key],
            value: [fd.value],
            query: query,
            module: module
          });
        } else {
          row[fd.key] = fd.value;
          client.emit('data', {
            row: Object.assign({}, row),
            query: query,
            module: module
          });
          row = Object.assign(row, defaultrow);
        }
      });

    form.append('input')
      .attr('name', 'value')
      .attr('key', key)
      .attr('value', d => d[key])
      .on('blur', row => {
        var input = d3.event.target;
        var form = input.closest('form');
        var key = input.getAttribute('key');
        row[key] = input.value;

        var span = input.closest('td').querySelector('span');
        d3.select(span).text(d => renderText(d[key]));
        form.hidden = true;
        span.hidden = false;
      });

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

