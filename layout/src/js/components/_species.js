document.addEventListener('DOMContentLoaded', function () {
  const nextPage = document.querySelector('.page-species__next-page');
  if (nextPage) {
    document.addEventListener('scroll', () => {
      const offset = document.documentElement.scrollTop + window.innerHeight;
      const height = document.documentElement.offsetHeight;

      let opacity = (offset - window.innerHeight) / height;
      opacity > 1 ? opacity = 1 : false;

      nextPage.style.opacity = opacity;
    })
  }
})
