const language = document.querySelector('[data-js="language"]');
const resultsList = document.querySelector('[data-js="results-list"]');
const templateWorker = new Worker('template-worker.js');
const config = {
  languageTag: 'en-US',
  list: []
}

language.addEventListener('change', handleLanguageSelection);

function handleLanguageSelection() {
  config.languageTag = this.value;
  render();
}

function setList(newList) {
  config.list = newList;
  render();
}

function render() {
  templateWorker.postMessage(config);
  templateWorker
    .addEventListener('message', ({ data }) => resultsList.innerHTML = data);
}

export { setList };
