const http = require("http")

// request -> el objeto que nos manda el front cuando hace una peticion
// response -> el objeto que le mandamos desde el back al front como respuesta
// a su peticion
const PORT = 5000;

const app = http.createServer(function(request, response){
    if(request.url === "/"){
        response.write("Hola, has caido en mi primer servidor. Bienvenido!")
        response.end()
    }
    if(request.url === "/tuvieja"){
        response.write("Whatsuuuuuuuuuuuuuuup! :pppp")
        response.end()
    }
})

app.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`))

// localhost:5000/

// localhost:5000/tuvieja