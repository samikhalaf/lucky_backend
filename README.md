# Lucky API REST 🐾

Esta es la API de la app Lucky.

## Mongo Atlas

Este back usa un clúster de Mongo Atlas para alojar su base de datos. Esto significa que tiene la base de datos está en el Cloud.

### Para visualizar los datos del Mongo Atlas desde el VS Code:

- Instalar la extensión `Mongo DB for VS Code` (tiene unas 57K descargas).
- Ir a la pestaña nueva en el menú de la izquierda (es una hojita).
- Darle a `Connect with a connection string` (debajo del titulo). Ponemos esto:

`mongodb+srv://lucky_app:RosendoChas1234@lucky-cluster.zjrqk.mongodb.net/luckydb?retryWrites=true&w=majority`

- Slava! Ya tenemos full access a nuestro clúster sin salir del VS Code.

## RUTAS

`/` → el server te saluda

### /pets

`GET` → devuelve todos los bichos en json, si pones `/:id` te devuelve uno solo ✅

`POST` → mete un bicho en la BBDD ✅

`PUT` → modifica los datos de un bicho ✅

`DELETE` → con `/:id` funciona perfecto ✅

### /users

`GET` → devuelve todos los usuarios en json, si pones `/:id` te devuelve uno solo ✅

`POST` en `/pets/register` mete un user en la BBDD ✅

`POST` en `/pets/login` verifica hashes y te da un token para navegar logueado ✅

`PUT` → modifica los datos de un usuario ✅

`DELETE` → con `/:id` funciona perfecto ✅

### /adopts

`GET` → devuelve todos los formularios de adopción en json, si pones `/:id` te devuelve uno solo ✅

`POST` → mete un formulario de adopcion en la BBDD ✅

`PUT` → modifica los datos de un formulario de adopción ✅

`DELETE` → con `/:id` funciona perfecto ✅

## Sobre el guardado de imágenes

- Se soportan formatos `.jpg`, `.jpeg` y `.png`.

- Cuando se suben, se almacenan en el directorio `public/uploads`.

- **Cuidado con la imagen `default-avatar.png`, si se borra perdemos la referencia a nuestra imagen por defecto para los usuarios**.

## Dependencias

Para el desarrollo de esta API se han utilizado los siguientes paquetes:

- Express → para crear el servidor

- Mongoose → como interfaz para las querys de Mongo Atlas

- Nodemon → para desarrollar más cómodamente

- Cors → para permitir el acceso público

- Multer → para gestionar la subida y acceso a imágenes

- jwt → para gestionar los tokens de autenticación

- bcrypt → para hashear las contraseñas
