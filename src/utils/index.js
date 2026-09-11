function showFormattedDate(date) {
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  };
  return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
}

function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diffMinutes = Math.floor((now - posted) / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'Baru saja';
  if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 30) return `${diffDays} hari lalu`;
  return showFormattedDate(date);
}

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export {showFormattedDate, postedAt, stripHtml};
