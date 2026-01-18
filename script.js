const ENDPOINT = "https://script.google.com/macros/s/AKfycbyisD75GxzsyTjTM25t3GzdXUxLMe6cf66B0tirR5bRVBEAuAmG3-kKJ5YdDV2ywR4/exec";

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     1. PORTADA / COVER ANIMATION
     ========================================= */
  const abrirBtn = document.getElementById("abrir-carta");
  const portada = document.getElementById("portada");
  const contenido = document.getElementById("contenido");

  if (abrirBtn && portada) {
    abrirBtn.addEventListener("click", () => {
      portada.style.opacity = '0';
      setTimeout(() => {
        portada.style.display = "none";
        contenido.style.opacity = "1";
      }, 1000);
    });
  }

  /* =========================================
     2. COUNTDOWN / CUENTA ATRÁS
     ========================================= */
  const contador = document.getElementById("contador");
  if (contador) {
    // FECHA CORRECTA: 18 de Julio de 2026
    const fechaBoda = new Date("2026-07-18T13:00:00").getTime();

    const actualizarCuenta = () => {
      const ahora = new Date().getTime();
      const distancia = fechaBoda - ahora;

      if (distancia < 0) {
        contador.innerHTML = "¡Hoy es el gran día!";
        return;
      }

      const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

      // Estilo visual "Pink Elegance"
      contador.innerHTML = `
        <div class="count-block">
            <span class="count-val">${dias}</span>
            <span class="count-label">Días</span>
        </div>
        <div class="count-block">
            <span class="count-val">${horas}</span>
            <span class="count-label">Hs</span>
        </div>
        <div class="count-block">
            <span class="count-val">${minutos}</span>
            <span class="count-label">Min</span>
        </div>
         <div class="count-block">
            <span class="count-val">${segundos}</span>
            <span class="count-label">Seg</span>
        </div>
      `;
    };

    setInterval(actualizarCuenta, 1000);
    actualizarCuenta();
  }

  /* =========================================
     3. RSVP FORM / CONFIRMACIÓN
     ========================================= */
  // Mostrar formulario
  const btnMostrar = document.getElementById("mostrar-confirmacion");
  const formWrapper = document.querySelector(".confirmacion-form-wrapper");

  if (btnMostrar && formWrapper) {
    btnMostrar.addEventListener("click", function () {
      formWrapper.style.display = "block";
      this.style.display = "none";
    });
  }

  // Enviar formulario
  const form = document.getElementById("formulario-rsvp");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombreInput = document.getElementById("nombre");
      const alergiasInput = document.getElementById("alergias");
      const asistenciaInput = document.getElementById("asistencia");
      const submitBtn = this.querySelector('button[type="submit"]');

      // Unir nombre y alergias para el formato de la hoja
      const nombreCompleto = nombreInput.value.trim() + " :: " + alergiasInput.value.trim();
      const asistencia = asistenciaInput.value;

      const originalText = submitBtn.innerText;
      submitBtn.innerText = "Enviando...";
      submitBtn.disabled = true;

      fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreCompleto, asistencia }),
      })
        .then(() => {
          alert("¡Gracias! Hemos recibido tu confirmación.");
          form.reset();
          submitBtn.innerText = "Enviado Correctamente";
        })
        .catch((err) => {
          console.error(err);
          alert("Hubo un error. Por favor inténtalo de nuevo.");
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        });
    });
  }
});
