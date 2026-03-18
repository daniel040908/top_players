import conexao from "../config/db.js"
import * as playerModels from "../models/playerModels.js"

export async function listar(req,res){
    const players = await playerModels.listarPlayers();
    res.json(players)
}

export async function buscarPlayer(req, res) {
    const player = await playerModels.buscarPlayer(req.params.id);

    if (!player || player.length === 0) {
        return res.status(404).json({ msg: "Player não encontrado" });
    }

    res.json(player);
}

export async function criar(req, res) {
    const { nickname, plataforma } = req.body;

    const id = await playerModels.criarPlayer({ nickname, plataforma });

    res.status(201).json({
        msg: "Player criado com sucesso",
        id: id
    });
}

export async function deletar(req,res) {
    const player = await playerModels.buscarPlayer(req.params.id)

    if (!player){
        return res.status(404).json({msg: "Player não encontrado"})
    }
    await playerModels.deletarPlayer(req.params.id)

    res.status(200).json({msg: "Player deletado com sucesso"})
} 