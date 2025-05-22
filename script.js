const express = require('express')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = 3000

app.use(express.json())

function addMensagem(nomeAluno, mensagem) {
    const idUnico = uuidv4();
    const dataHoraAtual = new Date().toISOString().replace("T", " ").split(".")[0]
    const mensagemFormatada = `${idUnico} - ${dataHoraAtual} - ${nomeAluno} - ${mensagem}\n`

    fs.appendFileSync('logs.txt', mensagemFormatada)
    return idUnico
j}
app.post('/addMensagem', (req, res) => {
    const { nomeAluno, mensagem } = req.body

    if (!nomeAluno || !mensagem) {
        return res.status(400).json({ error: 'nomeAluno e mensagem são obrigatórios.' })
    }

    try {
        const idGerado = addMensagem(nomeAluno, mensagem);
        res.status(200).json({ id: idGerado, message: 'Mensagem adicionada com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar mensagem.' })
    }
});

// Rota para consultar log por ID
app.get("/logs/:id", (req, res) => {
    const { id } = req.params

    try {
        const logs = fs.readFileSync("logs.txt", "utf8").split("\n").filter(log => log.trim() !== "")
        const logEncontrado = logs.find(log => log.startsWith(id))

        if (!logEncontrado) {
            return res.status(404).json({ error: "Log não encontrado." })
        }

        res.status(200).json({ log: logEncontrado })
    } catch (error) {
        res.status(500).json({ error: "Erro ao ler os logs." })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})