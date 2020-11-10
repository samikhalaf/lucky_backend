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

`POST` → mete un user en la BBDD ✅

`PUT` → funciona, pero todos los campos que envies vacios se quedan `null`

`DELETE` → con `/:id` funciona perfecto ✅

### /users

`GET` → devuelve todos los usuarios en json, si pones `/:id` te devuelve uno solo ✅

`POST` → mete un user en la BBDD ✅

`PUT` → funciona, pero todos los campos que envies vacios se quedan `null`

`DELETE` → con `/:id` funciona perfecto ✅

### /adopts

`GET` → devuelve todos los formularios de adopción en json, si pones `/:id` te devuelve uno solo ✅

`POST` → mete un formulario de adopcion en la BBDD ✅

`PUT` → no existe aun ❌

`DELETE` → con `/:id` funciona perfecto ✅
