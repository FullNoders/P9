if (typeof(Storage) === "undefined") {
    alert("tu navegador no soporta storage")
    window.location.href = '/';           
  }  
    
function setAvatar(){
  //guardamos avatar en storage
  var thisActive = document.getElementsByClassName('carousel-item active')[0];
        if (thisActive.id == 0){
          //Si no existe avatar
          alert("No hay avatar seleccionado");
          return false;
        }else{
          //existe avatar
          localStorage.setItem('avatar', JSON.stringify(thisActive.id));
          return true;
        }
}
      
function setUserName(){
  const userName = document.getElementById('username').value;
  if (userName!=''){
    localStorage.setItem("username",userName);
    return true;

  }else{
    alert("introduce nombre de usuario");
    return false;
  }
}



window.onload = function(){
  // Quita la autoreproducción
  var myCarousel = document.getElementById('carouselExampleIndicators');
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: false
  })

  //comportamiento formulario y redirección si avatar y username es correcto
  const form = document.getElementById("formu");
  form.onsubmit = (e) => {
  e.preventDefault();
  if(setUserName()&&setAvatar()){
    window.location.href = './rooms';
  }
}
  
}//onload