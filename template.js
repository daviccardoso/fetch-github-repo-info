const language = document.querySelector('[data-js="language"]');
const resultsList = document.querySelector('[data-js="results-list"]');
const templateWorker = new Worker('template-worker.js');
const config = new Proxy(
  {
    languageTag: 'en-US',
    list: []
  },
  {
    set: function (target, prop, value) {
      if (prop === 'languageTag' || prop === 'list') {
        Reflect.set(...arguments);
        render();
        return true;
      }
      return false;
    }
  });

language.addEventListener('change', handleLanguageSelection);

function handleLanguageSelection() {
  config.languageTag = this.value;
}

function setList(newList) {
  config.list = newList;
}

function render() {
  templateWorker.postMessage(Object.assign({}, config));
  templateWorker
    .addEventListener('message', ({ data }) => resultsList.innerHTML = data);
}

export { setList };
