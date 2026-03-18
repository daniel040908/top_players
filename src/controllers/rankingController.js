import * as rankingModels from "../models/rankingModel.js";

// Listar todos os rankings
export async function listar(req, res) {
    const rankings = await rankingModels.listarRankings();
    res.json(rankings);
}

// Listar rankings por jogo
export async function listarPorJogo(req, res) {
    const { jogoId } = req.params;
    const rankings = await rankingModels.rankingPorJogo(jogoId);
    res.json(rankings);
}

// Criar novo ranking
export async function criar(req, res) {
    const { usuario_id, jogo_id, pontuacao, posicao, data_ranking, temporada } = req.body;
    
    // Validação básica
    if (!usuario_id || !jogo_id) {
        return res.status(400).json({ 
            msg: "Campos obrigatórios: usuario_id, jogo_id" 
        });
    }
    
    const id = await rankingModels.criarRanking({
        usuario_id,
        jogo_id,
        pontuacao,
        posicao,
        data_ranking,
        temporada
    });
    
    res.status(201).json({
        msg: "Ranking criado com sucesso",
        id: id
    });
}
