'use strict';
(() => {
  var content = [];

  function doselect(row) {
    console.log('content row=', row);
  }

  window.content = {
    doselect: doselect
  };
})();
