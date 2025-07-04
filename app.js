const express = require('express')
const fs = require('fs/promises')


const app = express()
const PORT = 8000;

app.use(express.json())
// .use()
// .get()
// .post()
// .put()
// .delete()

app.get("/", function(request, response) {
    response.json({message: "Bienvenido a mi tienda online"})
})

app.get("/productos", async function(request, response) {
    const data = await fs.readFile(__dirname + "/db/db.txt")

    response.json(JSON.parse(data))
})

app.get("/productos/:id", async function(request, response) {

    // id del producto a buscar
    const {id} = request.params 

    const data = await fs.readFile(__dirname + "/db/db.txt")

    // Arreglo de productos
    const productos = JSON.parse(data) 

    const producto = productos.find(producto => producto.id === id)

    if(!producto){
        return response.status(404).json({message: "Producto no encontrado."})
    }
    
    response.status(200).json(producto)
} )


app.post("/productos", async function(request, response){
    // Extraemos del body de la request el producto que nos manda el front
    const producto = request.body

    // Leemos la DB
    const data = await fs.readFile(__dirname + "/db/db.txt")

    // Pasamos la DB de JSON a JS
    const productos = JSON.parse(data) 

    // Pusheamos el producto que nos manda el front
    productos.push({id: String(Date.now()) ,...producto})

    // Sobreescribimos la DB con el arreglo modificado
    await fs.writeFile(__dirname + '/db/db.txt', JSON.stringify(productos) ,'utf-8')

    response.status(201).json({message: "Producto creado exitosamente"})
})

app.put("/productos/:id", async function(request, response){
    const {id} = request.params
    // Extraemos del body de la request el producto editado que nos manda el front
    const productoEditado = request.body

    // Leemos la DB
    const data = await fs.readFile(__dirname + "/db/db.txt")

    // Pasamos la DB de JSON a JS
    const productos = JSON.parse(data) 

    // Eliminamos el producto original
    const productosFiltrados = productos.filter(producto => producto.id !== id)

    // Pusheamos la version editada
    productosFiltrados.push(productoEditado)

    // Sobreescribimos la DB con el arreglo modificado
    await fs.writeFile(__dirname + '/db/db.txt', JSON.stringify(productosFiltrados) ,'utf-8')

    response.status(200).json({message: "Producto editado exitosamente"})
})

app.delete("/productos/:id", async function(request, response) {
    const {id} = request.params

    // Leemos la DB
    const data = await fs.readFile(__dirname + "/db/db.txt")

    // Pasamos la DB de JSON a JS
    const productos = JSON.parse(data)

    // Eliminamos el producto original
    const productosFiltrados = productos.filter(producto => producto.id !== id)

    // Sobreescribimos la DB con el arreglo modificado
    await fs.writeFile(__dirname + '/db/db.txt', JSON.stringify(productosFiltrados) ,'utf-8')

    response.status(200).json({message: "Producto eliminado exitosamente"})
})


app.listen(PORT, () => console.log(`Servidor con express funcionando en el ${PORT}`))



