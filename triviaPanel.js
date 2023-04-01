const wrapper = document.querySelector('.wrapper');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.closeBtn');

wrapper.addEventListener('click', function(event) {
  if (event.target !== closeBtn) {
    sidebar.classList.add('active');
  }
});

closeBtn.addEventListener('click', function() {
  sidebar.classList.remove('active');
});
