# Lucky API REST 🐾

Esta es la API de la app Lucky.

## Mongo Atlas

Este back usa un clúster de Mongo Atlas para alojar su base de datos. Esto significa que tiene la base de datos está en el Cloud.

### Para visualizar los datos del Mongo Atlas desde el VS Code:

- Instalar la extensión `Mongo DB for VS Code` (tiene unas 57K descargas).
- Ir a la pestaña nueva en el menú de la izquierda (es una hojita).
- Darle a `Connect with a connection string` (debajo del titulo). Ponemos una connection string de Mongo Atlas:

- Slava! Ya tenemos full access a nuestro clúster sin salir del VS Code.

## RUTAS

`/` → el server te saluda

### /pets

`GET` → devuelve todos los bichos en json, si pones `/:id` te devuelve uno solo

`POST` → mete un bicho en la BBDD

`PUT` → modifica los datos de un bicho

`DELETE` → con `/:id` borra un bicho de la BBDD

### /users

`GET` → devuelve todos los usuarios en json, si pones `/:id` te devuelve uno solo

`PUT` → modifica los datos de un usuario

`DELETE` → con `/:id` borra un usuario de la BBDD

### /auth

`POST` en `/auth/register` mete un usuario nuevo en la BBDD

`POST` en `auth/login` comprueba si el email y la password un usuario registrado son correctos y te da una cookie de autenticación

`POST` en `auth/logout` cierra sesión

### /adopts

`GET` → devuelve todos los formularios de adopción en json, si pones `/:id` te devuelve uno solo

`POST` → mete un formulario de adopcion en la BBDD

`PUT` → modifica los datos de un formulario de adopción

`DELETE` → con `/:id` funciona perfecto

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

- Passport → para autenticar

- bcrypt → para hashear las contraseñas

- Cookie Session → para gestionar las cookies de autenticación

- Morgan → herramienta de logging para desarrollar y debuggear

- Dotenv → para gestionar las variables de entorno
