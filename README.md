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

### GET

`/` → el server te saluda

`/users` → devuelve todos los usuarios en json

`/pets` → devuelve todos los bichos en json

### POST

`/users` → Introduce una nueva entrada de usuarios

`/pets` → Introduce una nueva entrada de animalicos

### PUT

/pets/:id → Actualiza una entrada

### DELETE
