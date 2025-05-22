const fs = require('fs')
const { v4: uuidv4} = require('uuid')

function addMensagem(nomeAluno, mensagem = "logs.txt"){
    //gerar id 
    const idUnico = uuidv4()

    //data e hora atual
    const dataHoraAtual = new Date()

    //mensagem
    const mensagem = `${dataHoraAtual.toISOString()} - ${idUnico} - ${nomeAluno} - ${mensagem}\n`

    //escrever no arquivo
    fs.appendFileSync(arquivo, mensagem)

    //teste
    adicionarMensagem('lilian', 'teste prova ramon')
}