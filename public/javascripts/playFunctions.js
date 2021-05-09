idParent=undefined;
    

    window.onload = ()=>{
      saveRoom = localStorage.getItem('room');
      if(saveRoom =='1'||saveRoom=='2'||saveRoom=='3'||saveRoom=='4'){
        //alert("hay guardada una sala")
        var img = document.createElement('img');
        let avatar = localStorage.getItem('avatar');
        avatar = JSON.parse(avatar);
        img.setAttribute('src',avatar.img);
        let avatarHTML = '<img style="width:128px;height:128px;" id="avatarImg" draggable="true" ondragstart="drag(event)" src="'+avatar.img+'" alt="'+avatar.turtle+'">';
        document.getElementById(saveRoom).innerHTML += avatarHTML;
        document.getElementById('avatar').innerHTML='';
        document.getElementById('parrafo').innerText='Todo listo para que '+avatar.turtle+' comience el juego';
      }
      
      /* else{
        alert("no hay guardada una sala")
      } */        
      
    }
    
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/localStorage.
        if (localStorage.getItem("username")===null){
        //no esta definido
        window.location.href = './login';
        }else{
            // Nombre de usuario
            let username = localStorage.getItem('username');
            document.getElementById('username').innerHTML = username;
            // Avatar de usuario
            let avatar = localStorage.getItem('avatar');
            avatar = JSON.parse(avatar);
            let avatarHTML = '<img style="width:128px;height:128px;" id="avatarImg" draggable="true" ondragstart="drag(event)" src="'+avatar.img+'" alt="'+avatar.turtle+'">';
            document.getElementById('avatar').innerHTML = avatarHTML;
            document.getElementById('turtleName').innerHTML = avatar.turtle;
        }
    } else {
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
      //Evitamos arrastrar si hay una sala ya elegida
      //if(localStorage.getItem('room')==undefined){   
          ev.target.appendChild(document.getElementById(data));
          idParent=ev.target.id;
          //Guardamos la sala en Storage
          setSaveRoom(idParent);
          // Redirección
          window.location.href = window.location.href + "/" + idParent;
      //}
    }

    function setSaveRoom(idPar){
        if($(idPar).children().find("img")){
          $('#'+idPar).attr('name','select');
          localStorage.setItem('room',idPar);
        }
      }
    