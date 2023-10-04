const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('active');
  });
});

//block-vendor:tapcart
//block-type:social-media