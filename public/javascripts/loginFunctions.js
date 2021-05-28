// Si el navegador no soporta local storage mostramos un error y redirigimos
if (typeof(Storage) === "undefined") {
    alert("tu navegador no soporta storage")
    window.location.href = '/';           
  } 