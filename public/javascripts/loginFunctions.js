if (typeof(Storage) === "undefined") {
    alert("tu navegador no soporta storage")
    window.location.href = '/';           
  }  
  
    const avatares = [
      {
        id: 0,
        turtle: 'Unknown',
        img: 'https://i.pinimg.com/originals/73/6e/04/736e0413ebfe04be99ebc28be4c55fa2.png'
      },
      {
        id: 1,
        turtle: 'Miguel Ángel',
        img: 'https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/properties/teenage-mutant-ninja-turtles/characters/michelangelo-character-web-desktop.png'
      },
      {
        id: 2,
        turtle: 'Leonardo',
        img: 'https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/properties/teenage-mutant-ninja-turtles/characters/leonardo-character-web-desktop.png'
      },
      {
        id: 3,
        turtle: 'Donatello',
        img: 'https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/properties/teenage-mutant-ninja-turtles/characters/donatello-character-web-desktop.png'
      },
      {
        id: 4,
        turtle: 'Rafael',
        img: 'https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/properties/teenage-mutant-ninja-turtles/characters/raphael-character-web-desktop.png'
      }
    ];
  
  
      function setAvatar(){
        //guardamos avatar en storage
        var thisActive = document.getElementsByClassName('carousel-item active')[0];
        
              if (thisActive.id == avatares[0].id){
                //Si no existe avatar
                alert("No hay avatar seleccionado");
                return false;
              }else{
                //existe avatar
                
                let avatarObj = avatares.find(obj => {
                return obj.id == thisActive.id
                });
                localStorage.setItem('avatar', JSON.stringify(avatarObj));
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
  
        // Cargamos avatares
        let avataresHTML = "";
        let active = "";
        avatares.forEach(element => {
          if(element.id == 0){
            active = " active";
          }else{
            active = "";
          }
          avataresHTML += '<div id="'+element.id+'" class="carousel-item'+active+'">';
          avataresHTML += '<img src="'+element.img+'" class="d-block w-100" alt="'+element.turtle+'">';
          avataresHTML += '</div>';
          document.getElementById('avataresHTML').innerHTML = avataresHTML;
        });
  
        //comportamiento formulario y redirección si avatar y username es correcto
        const form = document.getElementById("formu");
        form.onsubmit = (e) => {
        e.preventDefault();
        if(setUserName()&&setAvatar()){
          window.location.href = './rooms';
        }
      }
        
      }//onload