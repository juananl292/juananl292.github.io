document.addEventListener("DOMContentLoaded", function() {
  const imgs = document.querySelectorAll('.galeria-carrusel img');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  imgs.forEach(img => observer.observe(img));
});