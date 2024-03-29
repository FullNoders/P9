idParent=undefined;

/* Evento onload */
window.onload = ()=>{
  saveRoom = localStorage.getItem('room');
  if(saveRoom =='1'||saveRoom=='2'||saveRoom=='3'||saveRoom=='4'){
    var img = document.createElement('img');
    img.setAttribute('src',avatar.image);
    let avatarHTML = '<img style="width:128px;height:128px;" id="avatarImg" draggable="true" ondragstart="drag(event)" src="'+avatar.image+'" alt="'+avatar.name+'">';
    document.getElementById(saveRoom).innerHTML += avatarHTML;
    document.getElementById('avatar').innerHTML='';
    document.getElementById('parrafo').innerText='Todo listo para que '+avatar.name+' comience el juego';
  }     
}

// Si el navegador no soporta local storage mostramos un error y redirigimos
if (typeof(Storage) === "undefined") {
    alert("tu navegador no soporta storage");
    window.location.href = '/';
}

/* Funciones drag and drop para arrastrar los avatares y seleccionar sala */

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  idParent=ev.target.id;
  // Redirección a la sala elegida
  window.location.href = window.location.href + "/" + idParent;
}

// Esta función se hizo para que funcione la selección de salas también por clic
// De esta forma se puede utilizar en dispositivos táctiles, pulsando en la sala
function chooseRoom(roomId){
  window.location.href = window.location.href + "/" + roomId;
}
