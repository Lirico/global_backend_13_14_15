const fs = require('fs')


// Leo la base datos, obtengo la data en forma de texto plano
const data = fs.readFileSync('./db/db.txt', 'utf-8')

// Convierto la data a JavaScript para poder operarla
const dataConvertida = JSON.parse(data) 

// Opero la data agregando un nuevo producto
dataConvertida.push({id:"5",product:"Procesadora",price:6000})

// Vuelvo a convertir nuevamente la data a texto plano para poder actualizar mi base de datos
const dataEnTXT = JSON.stringify(dataConvertida)

// Sobreescribo mi DB pisando la data vieja con la data actualizada
fs.writeFileSync('./db/db.txt', dataEnTXT,'utf-8')


