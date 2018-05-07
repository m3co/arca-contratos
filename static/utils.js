'use strict';
var renderText = t => t ? (t.toString().trim() ? t : '-') : '-';
function setupRedact(idkey, key, module, query = 'update') {
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

        form.querySelector('input[name="value"]').select();
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
          Object.assign(row, defaultrow);
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
      .attr('value', idkey)
      .attr('type', 'hidden');

    form.append('input')
      .attr('name', 'key')
      .attr('value', key)
      .attr('type', 'hidden');

    form.append('input')
      .attr('name', 'id')
      .attr('idkey', idkey)
      .attr('value', d => d[idkey])
      .attr('type', 'hidden');
  }
}

function setupDefault(defaultRow) {
  var row = Object.assign({}, defaultRow);
  row[Symbol.for('defaultrow')] = defaultRow;
  return [row];
}
