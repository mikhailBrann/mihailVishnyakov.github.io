'use strict';
//изменения вносил только в функцию toggleMenu
function toggleMenu(event) {
  event.preventDefault();
  if (event.target.parentNode.classList.contains('show')) {
    event.target.parentNode.classList.remove('show');
    event.target.parentNode.classList.add('hide');
  } else {
    event.target.parentNode.classList.add('show');
    event.target.parentNode.classList.remove('hide');
  }
}

function openLink(event) {
  console.log(this.textContent);
}

function init(node) {
  node.addEventListener('click', toggleMenu);
}

function initLink(node) {
  if (node.dataset.toggle) {
    return;
  }
  node.addEventListener('click', openLink);
}

Array
  .from(document.querySelectorAll('.dropdown'))
  .forEach(init);

Array
  .from(document.querySelectorAll('a'))
  .forEach(initLink);
