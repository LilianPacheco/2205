
//importar
const express = require('express')

//inicializando
const app = express()

//define porta
const porta = 3000

// rota 
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!')
})

// inicia
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
})