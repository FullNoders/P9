
function conquer(cell){
    let rowcol = cell.split("-");
    let row = rowcol[0];
    let col = rowcol[1];
    let data = {};
    data.row = row;
    data.col = col;
    let json = JSON.stringify(data);
    let xhr = new XMLHttpRequest();
    xhr.open('put', window.location.href+'/update', true);
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
    // asignar clase del usuario en esa celda (añadir clase )
    // hacer persistencia en la "base de datos" (hacer llamada a rooms/id/update con parámetro de id celda(row y col) e id de jugador)
    // https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
  }