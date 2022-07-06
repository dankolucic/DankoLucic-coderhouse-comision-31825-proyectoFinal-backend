Servidor:
    levantar servidor con "node servidor.js"

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