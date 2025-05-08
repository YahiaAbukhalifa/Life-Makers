document.addEventListener('DOMContentLoaded', function () {
  var loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(function () {
      loader.classList.add('hide');
      setTimeout(function () {
        loader.style.display = 'none';
      }, 600);
    }, 1500);
  }
});