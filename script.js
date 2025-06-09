const ENDPOINT = "https://script.google.com/macros/s/AKfycbwZK-lZznKhaLhRnj24xLQ6SbfYrCvcO0ZMIswT16Dh2V9SFp5JZrDGsd8p_v6AK9Ji/exec";

document.addEventListener("DOMContentLoaded", function () {
  // Manejar animación de la carta
  const abrirBtn = document.getElementById("abrir-carta");
  const carta = document.querySelector(".carta");
  const portada = document.querySelector(".portada");
  const contenido = document.querySelector(".contenido");

  abrirBtn.addEventListener("click", () => {
    carta.classList.add("abierta");
    setTimeout(() => {
      portada.style.display = "none";
      contenido.style.display = "block";
    }, 1000); // tiempo igual al de la animación CSS
  });

  // Manejar envío del formulario RSVP
  const form = document.getElementById("formulario-rsvp");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const asistencia = document.getElementById("asistencia").value;

      if (!nombre || !asistencia) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ nombre, asistencia }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(() => {
          alert(`Gracias, ${nombre}. Tu confirmación ha sido enviada.`);
          form.reset();
        })
        .catch((err) => {
          alert("Hubo un error al enviar tu confirmación. Intenta de nuevo.");
          console.error(err);
        });
    });
  }

  // Contador regresivo
  const contador = document.getElementById("contador");
  if (contador) {
    const fechaBoda = new Date("2025-09-20T13:00:00").getTime();

    setInterval(() => {
      const ahora = new Date().getTime();
      const distancia = fechaBoda - ahora;

      const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

      contador.innerHTML = `${dias} días, ${horas}h, ${minutos}m, ${segundos}s`;
    }, 1000);
  }

  // Mostrar formulario de confirmación
  document.getElementById("mostrar-confirmacion").addEventListener("click", function () {
    document.querySelector(".confirmacion").style.display = "block";
    this.style.display = "none";
  });
});
