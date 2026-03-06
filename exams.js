document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-buttons button');
  const searchInput = document.getElementById('examSearch');
  const cards = document.querySelectorAll('.exam-card');

  function applyFilter(filter) {
    cards.forEach(card => {
      const cats = card.dataset.categories.split(' ');
      if (filter === 'all' || cats.includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
      searchInput.value = '';
    });
  });

  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase();
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(term)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // accordion behavior
  cards.forEach(card => {
    const header = card.querySelector('.card-header');
    const content = card.querySelector('.accordion-content');
    header.addEventListener('click', () => {
      content.classList.toggle('open');
    });
  });
});