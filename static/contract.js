'use strict';
(() => {

  var Children = Symbol();
  var root = {
    id: '2', expand: true
  };
  root[Children] = [];

  var tree = {};
  tree[Children] = [root];
  var unsorted = [];

  window.tree = tree;
  window.unsorted = unsorted;

  var lastSTO;

  function doselect(row) {
    if (row.expand) {
      row[Children] = [];
    }

    function search(id, tree) {
      var parent;
      if (tree[Children] instanceof Array) {
        parent = tree[Children].find(d => d.id == id);
        if (parent) {
          return parent;
        }
        for (var i = 0; i < tree[Children].length; i++) {
          parent = search(id, tree[Children][i]);
          if (parent) {
            return parent;
          }
        }
      }
    }
    var parent = search(row.parent, tree);
    if (!parent) {
      unsorted.push(row);
    } else {
      parent[Children].push(row);
    }

    if (lastSTO) {
      clearTimeout(lastSTO);
    }
    lastSTO = setTimeout(() => {
      if (lastSTO < 100) return;
      render(d3.select('ol.tree'), tree);
    }, 300);
  }

  function render(base, tree) {
    if (!(tree[Children] instanceof Array)) {
      return;
    }
    var tr = base.selectAll('li')
      .data(tree[Children].filter(d => d.expand))
      .enter().append('li');

    tr.append('label').attr('for', d => d.id).text(d => d.id);
    tr.append('input').attr('type', 'checkbox').attr('for', d => d.id);
    tr.append('ol').attr('root', d => d.id);

    base.selectAll('li.file').data(tree[Children].filter(d => !d.expand))
      .enter().append('li').attr('class', 'file').append('a')
        .attr('href', '#').text(d => d.id)

    for (var i = 0; i < tree[Children].length; i++) {
      if (tree[Children][i].expand) {
        render(d3.select(`ol[root="${tree[Children][i].id}"]`),
          tree[Children][i]);
      }
    }
  }

  window.doselect = doselect;
})();
