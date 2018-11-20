self.addEventListener('message', ({ data }) => {
  render(data);
});

function render({ languageTag, list }) {
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

  postMessage(html);
}
