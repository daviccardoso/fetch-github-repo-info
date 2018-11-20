const language = document.querySelector('[data-js="language"]');
const resultsList = document.querySelector('[data-js="results-list"]');
let languageTag = 'en-US';
let list = [];


language.addEventListener('change', handleLanguageSelection);

function handleLanguageSelection() {
  languageTag = this.value;
  render();
}

function setList(newList) {
  list = newList;
  render();
}

function render() {
  const numberFormatter = new Intl.NumberFormat(languageTag);
  const dateFormatter = new Intl.DateTimeFormat(languageTag, {
    'day': 'numeric',
    'weekday': 'long',
    'month': 'long',
    'year': 'numeric'
  });

  let html = '';

  list.forEach(item => {
    const createdAt = dateFormatter.format(new Date(item.created_at));
    const forks = numberFormatter.format(item.forks);

    html += `
        <li>
          Name: ${item.full_name}<br>
          Created At: ${createdAt}<br>
          Forks: ${forks}
        </li>
        `
  });

  resultsList.innerHTML = html;
}

render();

export { setList };
