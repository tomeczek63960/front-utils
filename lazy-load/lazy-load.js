let lazyloadImages;
let lazyloadThrottleTimeout;
if ('IntersectionObserver' in window) {
  lazyloadImages = document.querySelectorAll('.lazyLoad');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        if (image.tagName === 'IFRAME') {
          image.classList.remove('lazyLoad');
          image.src = image.dataset.src;
          imageObserver.unobserve(image);
        } else if (image.tagName === "PICTURE") {
          const elements = image.querySelectorAll('source, img');
          image.classList.remove('lazyLoad');
          elements.forEach((el) => {
            if (el.tagName === 'SOURCE') {
              // eslint-disable-next-line no-param-reassign
              el.srcset = el.dataset.srcset;
            } else {
              // eslint-disable-next-line no-param-reassign
              el.src = el.dataset.src;
            }
          });
          imageObserver.unobserve(image);
        } else if (image.tagName === "IMG") {
          image.classList.remove('lazyLoad');
          image.src = image.dataset.src;
          imageObserver.unobserve(image);
        }
      }
    });
  });

  lazyloadImages.forEach((image) => {
    imageObserver.observe(image);
  });
} else {
  lazyloadImages = document.querySelectorAll('.lazyLoad');

  const lazyload = () => {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset;
      lazyloadImages.forEach((img) => {
        if (img.tagName === 'IFRAME') {
          if (img.offsetTop < (window.innerHeight + scrollTop)) {
            img.classList.remove('lazyLoad');
            // eslint-disable-next-line no-param-reassign
            img.src = img.dataset.src;
          }
        } else if (img.offsetTop < (window.innerHeight + scrollTop)) {
          const elements = img.querySelectorAll('source, img');
          img.classList.remove('lazyLoad');
          elements.forEach((el) => {
            if (el.tagName === 'SOURCE') {
              el.srcset = el.dataset.srcset;
            } else {
              el.src = el.dataset.src;
            }
          });
        }
      });

      if (lazyloadImages.length === 0) {
        document.removeEventListener('scroll', lazyload);
        window.removeEventListener('resize', lazyload);
        window.removeEventListener('orientationChange', lazyload);
      }
    }, 20);
  };

  document.addEventListener('scroll', lazyload);
  window.addEventListener('resize', lazyload);
  window.addEventListener('orientationChange', lazyload);
}