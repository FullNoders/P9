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
docker run --network p9p4 --name -p 3000:3000 -d conquista
- Parámetro opcional para copiar cambios de la aplicación
-v PATH_SISTEMA:/usr/src/app
## Importación datos en base de datos
- Visualizamos el id del contenedor
docker ps
- Nos conectamos por línea de comandos
docker exec -it CONTAINER_ID bash
- Ejecutamos la importación de datos
node createDatabase.js
## Uso
Al ejecutar el contenedor de la aplicación se queda a la escucha en el localhost:3000
