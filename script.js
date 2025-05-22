const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

// adicionar mensagem
function addMensagem(nomeAluno, mensagem = "logs.txt") {
    const idUnico = uuidv4();
    const dataHoraAtual = new Date();
    const mensagemFormatada = `${dataHoraAtual.toISOString()} - ${idUnico} - ${nomeAluno} - ${mensagem}\n`

    fs.appendFileSync('logs.txt', mensagemFormatada);
}

// rota para dados e mensagem
app.post('/addMensagem', (req, res) => {
    const { nomeAluno, mensagem } = req.body

    if (!nomeAluno || !mensagem) {
        return res.status(400).json({ error: 'nomeAluno e mensagem são obrigatórios.' })
    }

    try {
        addMensagem(nomeAluno, mensagem);
        res.status(200).json({ message: 'Mensagem adicionada com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar mensagem.' })
    }
});

// iniciar 
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

