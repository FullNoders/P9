
function conquer(cell){
    // Animación canvas
    var canvas = document.createElement('canvas');
    canvas.width=64;
    canvas.height=64;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, 64, 64);
    ctx.fillStyle = "black";
    ctx.fill();
    document.getElementById(cell).appendChild(canvas);
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
                window.location.reload();
            } else {
                console.error(res);
            }        
        };
        xhr.send(json);
    }, 600);    
  }