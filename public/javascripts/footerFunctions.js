function deleteStorage(){
    window.location.href = '/borrar';
}

// Si hay datos en local storage habilitamos la función de borrado de datos
if(localStorage.length > 0){
    document.getElementById('deleteUserDataOption').style.display = "";
}else{
    document.getElementById('deleteUserDataOption').style.display = "none";
}