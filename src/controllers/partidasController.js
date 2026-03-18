import * as partidasModels from "../models/partidasModels.js";


export async function listar(req, res) {
    const partidas = await partidasModels.listarPartidas();
    res.json(partidas);
}

export async function criar(req, res) {
    const { jogo_id, jogador1_id, jogador2_id, pontuacao_jogador1, pontuacao_jogador2, data_partida, status } = req.body;
    
    if (!jogo_id || !jogador1_id || !jogador2_id) {
        return res.status(400).json({ 
            msg: "Campos obrigatórios: jogo_id, jogador1_id, jogador2_id" 
        });
    }
    
    const id = await partidasModels.criarPartida({
        jogo_id,
        jogador1_id,
        jogador2_id,
        pontuacao_jogador1,
        pontuacao_jogador2,
        data_partida,
        status
    });
    
    res.status(201).json({
        msg: "Partida criada com sucesso",
        id: id
    });
}

export async function deletar(req, res) {
    const partida = await partidasModels.buscarPartida(req.params.id);
    
    if (!partida) {
        return res.status(404).json({ msg: "Partida não encontrada" });
    }
    
    await partidasModels.deletarPartida(req.params.id);
    res.status(200).json({ msg: "Partida deletada com sucesso" });
}