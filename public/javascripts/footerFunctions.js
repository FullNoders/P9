
function deleteStorage(){
    window.location.href = '/borrar';
}

// Si hay datos en local storage habilitamos la función de borrado de datos
if(localStorage.length > 0){
    document.getElementById('deleteUserDataOption').style.display = "";
}else{
    document.getElementById('deleteUserDataOption').style.display = "none";
}

function clic(cell){

    // slice de - para obtener fila y columna
    let celda = document.getElementById(cell);
    // row
    let row = cell.substring(0,1); //nos dará la letra que indica la fila
    // col
    let col = cell.substring(2,3); //nos dará el número que indica la columna
    // asignar clase del usuario en esa celda (añadir clase )
    //let claseCSS = player.avatar;

    //celda.setAttribute('style',`background-image:${player.avatar}; width:10px; height:10px`);
    

  /*   var url = window.location.href;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert(xhr.responseText);
        }
    }
    xhr.open(room.update, url, false);
    xhr.send(null); */


    // hacer persistencia en la "base de datos" (hacer llamada a rooms/id/update con parámetro de id celda(row y col) e id de jugador)
    var xhr = new XMLHttpRequest();
    
    
    if (xhr.status == 200) {
      (avatarJug)=>{playerAvatar = avatarJug}
      celda.setAttribute('style',`background-image:${playerAvatar}; width:10px; height:10px;`);
    } else {
      console.log("error xhr");
    }
    xhr.open('GET', '/move', false);
    xhr.send(row,col);
    // https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
  }