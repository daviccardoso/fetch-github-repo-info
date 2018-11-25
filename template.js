const language = document.querySelector('[data-js="language"]');
const resultsList = document.querySelector('[data-js="results-list"]');
const templateWorker = new Worker('template-worker.js');
const config = new Proxy(
  {
    languageTag: localStorage.getItem('language') || 'en-US',
    list: JSON.parse(sessionStorage.getItem('listItems')) || []
  },
  {
    set: function(target, prop, value) {
      if (prop === 'languageTag' || prop === 'list') {
        Reflect.set(...arguments);
        render();
        return true;
      }
      return false;
    }
  });

language.value = config.languageTag;
language.addEventListener('change', handleLanguageSelection);

function handleLanguageSelection() {
  config.languageTag = this.value;
  localStorage.setItem('language', this.value);
}

function setList(newList) {
  sessionStorage.setItem('listItems', JSON.stringify(newList));
  config.list = newList;
}

function render() {
  templateWorker.postMessage(Object.assign({}, config));
  templateWorker
    .addEventListener('message', ({ data }) => resultsList.innerHTML = data);
}

(() => render())();

export { setList };
