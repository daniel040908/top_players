import * as rankingModels from "../models/rankingModel.js";

// Listar todos os rankings
export async function listar(req, res) {
    const rankings = await rankingModels.listarRankings();
    res.json(rankings);
}

// Listar rankings por jogo
export async function listarPorJogo(req, res) {
    const { jogoId } = req.params;
    const rankings = await rankingModels.listarRankingsPorJogo(jogoId);
    res.json(rankings);
}

// Listar rankings por temporada
export async function listarPorTemporada(req, res) {
    const { temporada } = req.params;
    const rankings = await rankingModels.listarRankingsPorTemporada(temporada);
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

// Deletar ranking
export async function deletar(req, res) {
    const ranking = await rankingModels.buscarRanking(req.params.id);
    
    if (!ranking) {
        return res.status(404).json({ msg: "Ranking não encontrado" });
    }
    
    await rankingModels.deletarRanking(req.params.id);
    res.status(200).json({ msg: "Ranking deletado com sucesso" });
}

// Deletar rankings por temporada
export async function deletarPorTemporada(req, res) {
    const { temporada } = req.params;
    
    const deletados = await rankingModels.deletarRankingsPorTemporada(temporada);
    
    res.status(200).json({ 
        msg: `${deletados} rankings da temporada ${temporada} deletados com sucesso` 
    });
}