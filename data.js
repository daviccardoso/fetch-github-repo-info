import { setList } from './template.js';

const searchTerm = document.querySelector('[data-js="search-term"]');
let timer;
searchTerm.addEventListener('keyup', search);

function search(event) {
  if (event && event.keyCode === 13) {
    const searchQuery = searchTerm.value;

    clearTimeout(timer);

    timer = setTimeout(() => {
      fetch(`https://api.github.com/search/repositories?q=${searchQuery}`)
        .then(response => response.json())
        .then(data => setList(data.items));
    }, 200);
  }
}

export { };
