# P9 Producto 4
La aplicación se ejecuta dentro de un docker, y la base de datos está en otro docker.
## Crear network
docker network create p9p4
## Configuración base de datos mongodb
- Descargar imagen
docker pull mongo
- Ejecutar contenedor
docker run --network p9p4 --name p9p4-mongo -d mongo
## Configuración aplicación
- Descarga imagen
docker pull teby44/p9p4-app
- Ejecutar contenedor
docker run --network p9p4 --name conquista -p 3000:3000 -d teby44/p9p4-app
- Parámetro opcional para copiar cambios de la aplicación
-v PATH_SISTEMA:/usr/src/app
## Uso
Al ejecutar el contenedor de la aplicación se queda a la escucha en el localhost:3000
## Uso alternativo
Hemos desplegado a un entorno de producción utilizando:
- MongodbAtlas para la base de datos
- Heroku para la aplicación
- Se puede jugar directamente accediendo a este enlace: https://fullnoders.herokuapp.com
# Reglas de juego
- Hay 4 salas disponibles para jugar
- Cuando una sala se llena, con 3 jugadores, comienza la partida
- Si un jugador abandona la sala, esté llena o no, se expulsa a los jugadores de la sala y la partida es cancelada
- Al comenzar la partida, cada jugador puede hacer un movimiento por turno
- Se debe conquistar una celda del casillero, haciendo clic en la celda
- Gana el que haya conquistado más celdas del casillero al finalizar la partida
- La partida finaliza cuando ya no quedan más celdas por conquistar
- Aleatoriamente se van destruyendo casilleros
- Si el casillero destruido estaba ocupado por un jugador, pierde la conquista de esa celda
## Desconexión
La desconexión se gestiona por socket.io. La pérdida de conexión a internet, cierre de la pestaña de juego o refresco de la página supone un cierre de socket que se interpreta como abandono de la partida.
# Observaciones
Sería una buena práctica implementar variables de entorno en heroku y cargarlas para hacer la conexión a la base de datos.
