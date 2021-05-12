
function conquer(cell){
    // Animación canvas
    renderCanvasP9(cell);
/*     
    var canvas = document.createElement('canvas');
    canvas.width=64;
    canvas.height=64;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, 64, 64);
    ctx.fillStyle = "black";
    ctx.fill();
    document.getElementById(cell).appendChild(canvas); */
    // petición xhr
    setTimeout(function () {
        let rowcol = cell.split("-");
        let row = rowcol[0];
        let col = rowcol[1];
        let data = {};
        data.row = row;
        data.col = col;
        let json = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.open('put', window.location.href+'/update', true); // /rooms/1/update
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.log(res);
                let room = res.room;
                let player = res.player;
                //socket.emit('conquer', json);
            } else {
                console.error(res);
            }        
        };
        xhr.send(json);
    }, 600);  
  }

/* Esperando aviso de fin de turno */ 
socket.on('start', function(msg) {
    // Refrescamos pantalla
    window.location.reload();
});

/* Esperando aviso de fin de turno */ 
socket.on('next', function(msg) {
    // Refrescamos pantalla
    window.location.reload();
});

/* Esperando aviso de jugador abandonando juego */ 
/* socket.on('desertor', function(msg) {
    // Refrescamos pantalla
    alert("Un jugador ha abandonado la partida. El juego se dará por finalizado.");
    window.location.href = "/";
}); */


function renderCanvasP9(cell){
    
//set the variables
var a = document.createElement('canvas'),
c = a.getContext('2d'),
w = a.width = 64,
h = a.height = 64,
area = w * h,
particleNum = 300,
ANIMATION;

document.getElementById(cell).appendChild(a);

var particles = [];


//create the particles
function Particle(i) {
this.id = i;
this.hue =  rand(50, 0, 1);
this.active = false;
}

Particle.prototype.build = function() {
this.x = w / 2;
this.y = h / 2;
this.r = rand(7, 2, 1);
this.vx = Math.random() * 10 - 5;
this.vy = Math.random() * 10 - 5;
this.gravity = .01;
this.opacity = Math.random() + .5;
this.active = true;

c.beginPath();
  c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
c.fillStyle = "hsla(" + this.hue + ",100%,50%,1)";
c.fill();
};

Particle.prototype.draw = function() {
this.active = true;
this.x += this.vx;
this.y += this.vy;
this.vy += this.gravity;
this.hue -= 0.5;
this.r = Math.abs(this.r - .05);

c.beginPath();
  c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
c.fillStyle = "hsla(" + this.hue + ",100%,50%,1)";
c.fill();

// reset particle
if(this.r <= .05) {
this.active = false;
}
};


//functionality
function drawScene() {
c.fillStyle = "black";
c.fillRect(0,0,w,h);

for(var i = 0; i < particles.length; i++) {
if(particles[i].active === true) {
  particles[i].draw();
} else {
  particles[i].build();
}
}

  ANIMATION = requestAnimationFrame(drawScene);
}

function initCanvas() {
var s = getComputedStyle(a);

if(particles.length) {
particles = [];
cancelAnimationFrame(ANIMATION);
ANIMATION;
console.log(ANIMATION);
}

w = a.width = 64;
h = a.height = 64;

for(var i = 0; i < particleNum; i++) {
particles.push(new Particle(i));
}

drawScene();
console.log(ANIMATION);
}


//init
(function() {
initCanvas();
addEventListener('resize', initCanvas, false);
})();


//helper functions
function rand(max, min, _int) {
var max = (max === 0 || max)?max:1, 
  min = min || 0, 
  gen = min + (max - min) * Math.random();

return (_int) ? Math.round(gen) : gen;
};
}