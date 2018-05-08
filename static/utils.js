'use strict';
const excludeFields = ['id', 'createdAt'];
function renderText(t) {
  return t ? (t.toString().trim() ? t : '-') : '-';
}

function defineBlurHandler(row) {
  var input = d3.event.target;
  var form = input.closest('form');
  var key = input.getAttribute('key');
  row[key] = input.value;

  var span = input.closest('td').querySelector('span');
  d3.select(span).text(d => renderText(d[key]));
  form.hidden = true;
  span.hidden = false;
}

function defineSubmitHandler(row) {
  var e = d3.event;
  e.preventDefault();

  var form = e.target;
  var span = form.parentElement.querySelector('span');
  form.hidden = true;
  span.hidden = false;

  var fd = new FormData(form).toJSON();
  row[fd.key] = fd.value;
  if (fd.query == 'update') {
    var keys = Object.keys(row).filter(d => !excludeFields.includes(d));
    client.emit('data', {
      id: fd.id,
      idkey: fd.idkey,
      key: keys,
      value: keys.map(key => row[key]),
      query: fd.query,
      module: fd.module
    });
  } else {
    client.emit('data', {
      row: Object.assign({}, row),
      query: fd.query,
      module: fd.module
    });
    var defaultrow = row[Symbol.for('defaultrow')];
    Object.assign(row, defaultrow);
  }
}

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
      .on('submit', defineSubmitHandler);

    form.append('input')
      .attr('name', 'value')
      .attr('key', key)
      .attr('value', d => d[key])
      .on('blur', defineBlurHandler);

    form.append('input')
      .attr('name', 'module')
      .attr('value', module)
      .attr('type', 'hidden');

    form.append('input')
      .attr('name', 'query')
      .attr('value', query)
      .attr('type', 'hidden');

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

function updateTbody(tb) {
  // UPDATE
  tb.select('span')
    .text((d, i, m) => renderText(d[m[i].getAttribute('key')]));
  tb.select('input[name="value"]')
    .attr('value', (d, i, m) => d[m[i].getAttribute('key')])
    .on('blur', null)
    .on('blur', defineBlurHandler);
  tb.select('input[name="id"]')
    .attr('value', (d, i, m) => d[m[i].getAttribute('idkey')]);
  tb.select('button.delete')
    .attr('id', (d, i, m) => d[m[i].getAttribute('idkey')]);
  tb.select('form')
    .on('submit', null)
    .on('submit', defineSubmitHandler);
}

function setupRedacts(module, idkey, fields, tr, query='update') {
  fields.forEach(field =>
    tr.append('td').call(setupRedact(idkey, field, module, query))
  );
}
