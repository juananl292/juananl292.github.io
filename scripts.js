document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer genérico para animaciones de entrada
  const observerOptions = {
    threshold: 0.1, // Se activa cuando el 10% del elemento es visible
    rootMargin: "0px 0px -50px 0px" // Margen para activar un poco antes de que entre del todo
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Dejar de observar una vez animado
      }
    });
  }, observerOptions);

  // Seleccionar todos los elementos que deben animarse
  const elementsToAnimate = document.querySelectorAll('.fade-up');
  elementsToAnimate.forEach(el => observer.observe(el));
});