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
  }

  window.doselect = doselect;
})();
