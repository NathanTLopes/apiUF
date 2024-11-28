import express from'express';
import { buscarUfs, buscarUfsPorId, buscarUfsPorNome } from './servicos/servico.js';

const app = express();

app.get('/ufs', (req, res) => {
    const nomeUf = req.query.busca;
    const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : buscarUfs();
    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).json({"erro": "Nenhuma UF encontrada"});
    }
})

//app.get('/ufs', (req,res) =>{
//    res.json(colecaoUf.colecaoUf)
//});

app.get('/ufs/:iduf', (req, res) => {
    const uf = buscarUfsPorId(req.params.iduf);

    if (uf) {
        res.json(uf);
    }else if (isNaN(parseInt(req.params.iduf))){
        res.status(400).send({"erro": "Requisição inválida"});
    }else {
        res.status(400).send({"erro": "UF não encontrada"});
    }
});

app.listen(8080, () => {
    console.log('Servidor iniciador na porta 8080, é os guri pai ksksksk')
})