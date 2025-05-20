function abrirCarta() {
  const sobre = document.getElementById("sobre");
  sobre.classList.add("animar-sobre");

  // Esperar a que termine la animación (1s)
  setTimeout(() => {
    document.getElementById("carta").classList.add("oculto");
    document.getElementById("contenido").classList.remove("oculto");
  }, 1000);
}

function confirmarAsistencia() {
  alert("¡Gracias por confirmar tu asistencia!");
}
