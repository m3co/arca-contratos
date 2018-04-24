'use strict';
(() => {
  function doselect(row) {
    console.log('content row=', row);
  }

  window.content = {
    doselect: doselect
  };
})();
