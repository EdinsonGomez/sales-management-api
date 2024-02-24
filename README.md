
# Sales API Management

Una API en NodeJs que conectar por medio de ORM Prisma con una base de datos en Postgresql. Esta API permite administrar las ventas, los roles, los usuarios y los productos de la base de datos.

Los siguientes son los casos de uso para los que esta diseñada la API:

- Administrar las ventas
- Administrar los productos
- Administrar los usuarios
- Hacer cierres diarios
- Hacer un balance mensual


## Iniciar proyecto

### 1. Clonar proyecto

Clona el proyecto en tu maquina

### 2. Instalar dependencias

Asegurate se instalar todas las dependencias antes de continuar con los siguientes pasos.

### 3. Crear base de datos

La API se conectara a una base de datos Postgresql, por lo que debes asegurarte te tenerlo instalado (más informacion [aquí](https://www.postgresql.org/download/)).

Una vez instalado incia postgresql como servicio. Luego crea la base de datos con el siguiente comando en la consola de postgresql:

```
CREATE DATABASE "nombre";
```

para comprobar que la base de datos se haya creado con exito, escribe el siguiente comando en consola para listar todas la bases de datos:

```
\l
```

### 4. Variables de entorno

Para iniciar este proyecto, debes agregar las siguientes variables de entorno en el archivo `.env` en la raiz de proyecto:

```
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

Modifica esta variable de entorno con tu `username`, `password` y nombre de la base de datos.

### 5. Migrar base de datos

Para conectar con la base de datos se utiliza el ORM Prisma, que nos permite migrar la base de datos y crear las tablas correspondientes automaticamente. En consola escribe el siguiente comando:

```
npx prisma migrate dev
```

(más información [aquí](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-node-postgresql))

### 6. Iniciar proyecto

Para inciar el proyecto solo escribe en consola el siguiente comando:

```
npm run dev
```

Esto iniciara un servidor de NodeJs en el puerto `3000`;


## Postman collection

Si usas Postman, puedes descargar la colección [aquí](https://elements.getpostman.com/redirect?entityId=25425294-d91d1083-236a-428d-8aa0-77eb4196be73&entityType=collection)
## API Reference

### Headers

#### auth (required)
Id de usuario, debe ser enviada en cada petición.


### Obtener todos los productos

```http
  GET /products
```
***Authorization:*** ["all"]

#### Response

```js
[
  {
    "id": Number,
    "name": String,
    "description": String,
    "price": Number
  },
  ....
]
```

### Crear Producto

```http
  POST /products/create
```
***Authorization:*** ["admin"]

#### Body
```
{
  "name": String,
  "description": String,
  "price": Number
}
```


### Response
```js
{
  "id": Number,
  "name": String,
  "description": String,
  "price": Number
}
```

### Obtener todos los roles

```http
  GET /roles
```
***Authorization:*** ["admin"]

#### Response
```js
[
  {
    "id": Number,
    "name": String
  },
  ...
]
```

### Crear un nuevo rol

```http
  POST /roles/create
```
***Authorization:*** ["admin"]

#### Body
```js
{
  "name": String
}
```

#### Response
```js
{
  "id": Number,
  "name": String
}
```

### Obtener todos los usuarios

```http
  GET /users
```
***Authorization:***["admin"]

#### Response
```js
[
  {
    "id": Number,
    "name": String,
    "last_name": String,
    "document": String,
    "rol_id": Number,
    "rol": {
      "id": Number,
      "name": String
    }
  },
  ...
]
```

### Crear usuario

```http
  POST /users/create
```
***Authorization:***["admin"]

#### Body
```js
{
  "name": String,
  "last_name": String,
  "document": String,
  "rol_id": Number  //Optional
}
```

#### Response
```js
{
  "id": Number,
  "name": String,
  "last_name": String,
  "document": String,
  "rol_id": Number
}
```

### Actualizar el rol de un usuario

```http
  PUT /user/:id/rol
```
***Authorization:***["admin"]

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del usuario |

#### Body
```js
{
    "rol_id": Number
}
```

#### Response
```js
{
    "id": Number,
    "name": String,
    "last_name": String,
    "document": String,
    "rol_id": Number,
    "rol": {
        "id": Number,
        "name": String
    }
}
```

### Eliminar usuario
```http
  DELETE /users/:id
```
***Authorization:***["admin"]

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del usuario |

### Obtener todas las ventas

```http
  GET /sales
```
***Authorization:***["all"]

#### Response
```js
[
  {
    "id": Number,
    "qty": Number,
    "sales_at": Date, // ISO String
    "users_id": Number,
    "products_id": Number,
    "products": {
      "id": Number,
      "name": String,
      "description": String,
      "price": Number
    },
    "total": Number
  },
  ....
]
```

### Crear una venta

```http
  POST /sales/create
```
***Authorization:***["all"]

#### Body
```js
{
  "qty": Number,
  "products_id": Number
}
```

#### Response
```js
{
  "id": Number,
  "qty": Number,
  "sales_at": Date, // ISO String
  "users_id": Number,
  "products_id": Number
}
```

### Actualizar una venta

```http
  PUT /sales/:id
```
***Authorization:***["admin"]

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id de venta |

#### Body
```js
{
  "qty": Number, // Optional
  "sales_at": Date, // ISO String Optional
  "users_id": Number, // Optional
  "products_id": Number // Optional
}
```

#### Response
```js
{
  "id": Number,
  "qty": Number,
  "sales_at": Date, // ISO String
  "users_id": Number,
  "products_id": Number
}
```

### Eliminar venta

```http
  DELETE /sales/:id
```
***Authorization:***["admin"]

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id de venta |

### Obtener reporte de un fecha especifica

```http
  GET /report?date=""
```
***Authorization:***["admin"]

| Query param | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `date`      | `string` | **Required**. Fecha en formato ISO String |

### Response
```js
{
  "sales": [
    {
      "id": Number,
      "qty": Number,
      "sales_at": Date, // ISO String
        "users_id": Number,
        "products_id": Number,
        "products": {
          "id": Number,
          "name": String,
          "description": String,
          "price": Number
        },
        "total": Number
    },
    ...
  ],
  "total_sold": Number
}
```

### Obtener reporte ventas mes actual

```http
  GET /report/month
```
***Authorization:***["admin"]

#### Response
```js
{
  "sales": [
    {
      "id": Number,
      "qty": Number,
      "sales_at": Date, // ISO String
        "users_id": Number,
        "products_id": Number,
        "products": {
          "id": Number,
          "name": String,
          "description": String,
          "price": Number
        },
        "total": Number
    },
    ...
  ],
  "total_sold": Number
}
```

