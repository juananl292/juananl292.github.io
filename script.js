function abrirCarta() {
  const sobre = document.getElementById("sobre");
  sobre.classList.add("animar-sobre");

  setTimeout(() => {
    document.getElementById("carta").classList.add("oculto");
    document.getElementById("contenido").classList.remove("oculto");
  }, 1000);
}

// Cuenta regresiva
const fechaBoda = new Date("August 15, 2025 17:00:00").getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = fechaBoda - ahora;

  if (diferencia < 0) {
    document.getElementById("contador").innerHTML = "¡Ya estamos casados!";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
}

// Actualizar cada segundo
setInterval(actualizarContador, 1000);
actualizarContador();

// Confirmación de asistencia (RSVP)
document.getElementById("formulario-rsvp").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const asistencia = document.getElementById("asistencia").value;

  if (nombre && asistencia) {
    alert(`Gracias, ${nombre}. Hemos registrado tu respuesta: "${asistencia.toUpperCase()}"`);
    this.reset();
  } else {
    alert("Por favor, completa todos los campos.");
  }
});
