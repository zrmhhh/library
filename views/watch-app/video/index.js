let el = document.getElementById('search');

el.addEventListener('keyup', event => {
  if (event.keyCode === 13) {
    event.target.blur();
  }
})