const progressSection = document.querySelector('.js-progress-section');
const progressBar = document.querySelector('.progress-bar');

const setProgress = (progress) => {
  const progressWidth = `${(window.pageYOffset / ((progressSection.clientHeight + progressSection.offsetTop))) * 100}%`;
  progress.style.width = progressWidth;
};
if (progressBar) {
  const progress = progressBar.querySelector('.progress-bar__progress');

  const progressWidth = `${(window.pageYOffset / ((progressSection.clientHeight + progressSection.offsetTop))) * 100}%`;
  progress.style.width = progressWidth;

  window.addEventListener('scroll', () => {
    setProgress(progress);
  });
}