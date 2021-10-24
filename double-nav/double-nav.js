const topHeaderBlog = document.querySelector('.header');
const headerBlog = document.querySelector('.header--blog');
let previousScroll;

const hideNav = () => {
  headerBlog.classList.add('slide-up');
  topHeaderBlog.classList.add('is-hidden');
};

const showNav = () => {
  headerBlog.classList.remove('slide-up');
  topHeaderBlog.classList.remove('is-hidden');
};

const handleScroll = () => {
  const minScroll = window.innerWidth > 767 ? 60 : 48;
  const currentScroll = window.pageYOffset;
  if (currentScroll > previousScroll && currentScroll > minScroll) {
    hideNav();
  } else {
    showNav();
  }
  previousScroll = currentScroll;
};

document.addEventListener('scroll', handleScroll);