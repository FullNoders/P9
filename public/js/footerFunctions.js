function deleteStorage(){
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    localStorage.removeItem('room');
    alert("Tus datos han sido borrados")
    window.location.href = '/';
}

// Si hay datos en local storage habilitamos la función de borrado de datos
if(localStorage.length > 0){
    document.getElementById('deleteUserDataOption').style.display = "";
}else{
    document.getElementById('deleteUserDataOption').style.display = "none";
}