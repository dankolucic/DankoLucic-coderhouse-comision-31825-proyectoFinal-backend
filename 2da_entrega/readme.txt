Servidor:
    levantar servidor con "node servidor.js"

Config:
    en el objeto "config" del archivo "config.js" se encuentra la clave "persistence", cuyo valor determina qué tipo de persistencia se usará. Por defecto está seteada con valor "firebase". Opciones: "firebase","mongodb_local","mongodb_cloud", "file" (el switch se encuentra en los archivos "index.js" de la carpeta "daos").

API routes (products) y ejemplos de uso:

    GET --> http://localhost:8080/api/products --> Me permite listar todos los productos disponibles (disponible para todes).

    GET --> http://localhost:8080/api/products/1 --> Me permite listar un producto por su id (disponible para todes).

    POST --> http://localhost:8080/api/products --> Para incorporar productos al listado (disponible solo para administradores).
    body:
        {
            "name": "name_2",
            "description": "des_2",
            "price": 200,
            "image": "image_2",
        }

    PUT --> http://localhost:8080/api/products/2 --> Actualiza un producto por su id (disponible solo para administradores).
    body:
        {
            "name": "name_2_UPDATE",
            "description": "des_2_UPDATE"",
            "price": 299,
            "image": "image_2_UPDATE"",
        }

    DELETE --> http://localhost:8080/api/products/2 --> Borra un producto por su id(disponible solo para administradores).

API routes (carts) y ejemplos de uso:

    POST --> http://localhost:8080/api/carts --> Crea un carrito y devuelve su id.

    POST --> http://localhost:8080/api/carts/2/products --> Para incorporar productos al carrito, enviando el id de producto en el cuerpo de la petición.
    body:
        {
            "id":1
        }

    GET --> http://localhost:8080/api/carts/2/products --> Me permite listar todos los productos guardados en el carrito.

    DELETE --> http://localhost:8080/api/carts/2/products/1 --> Eliminar un producto del carrito por su id de carrito y de producto.

    DELETE --> http://localhost:8080/api/carts/2 --> Vaciar/eliminar un carrito.
