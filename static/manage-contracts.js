'use strict';
(() => {
  document.querySelector('#manage-contracts').addEventListener('click', () => {
    document.querySelector('#manage-contracts-space').style.display = '';
  });

  document.querySelector('#manage-contracts-space-close').addEventListener('click', () => {
    document.querySelector('#manage-contracts-space').style.display = 'none';
  });
})();
