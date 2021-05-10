idParent=undefined;
    
window.onload = ()=>{
  saveRoom = localStorage.getItem('room');
  if(saveRoom =='1'||saveRoom=='2'||saveRoom=='3'||saveRoom=='4'){
    //alert("hay guardada una sala")
    var img = document.createElement('img');
    img.setAttribute('src',avatar.image);
    let avatarHTML = '<img style="width:128px;height:128px;" id="avatarImg" draggable="true" ondragstart="drag(event)" src="'+avatar.image+'" alt="'+avatar.name+'">';
    document.getElementById(saveRoom).innerHTML += avatarHTML;
    document.getElementById('avatar').innerHTML='';
    document.getElementById('parrafo').innerText='Todo listo para que '+avatar.name+' comience el juego';
  }     
}

if (typeof(Storage) === "undefined") {
    alert("tu navegador no soporta storage");
    window.location.href = '/';
}

// D&D 
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
  // Redirección
  window.location.href = window.location.href + "/" + idParent;
}

function chooseRoom(roomId){
  window.location.href = window.location.href + "/" + roomId;
}
