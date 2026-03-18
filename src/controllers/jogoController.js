import conexao from "../config/db.js"
import * as jogoModels from "../models/jogoModels.js"

export async function listar(req,res){
    const jogos = await jogoModels.listarJogos();
    res.json(jogos)
}

export async function buscarJogos(req, res) {
    const jogo = await jogoModels.buscarJogos(req.params.id);

    if (!jogo || jogo.length === 0) {
        return res.status(404).json({ msg: "Jogo não encontrado" });
    }

    res.json(jogo);
}

export async function criar(req, res) {
    const { nome, genero } = req.body;

    const id = await jogoModels.criarJogo({ nome, genero });

    res.status(201).json({
        msg: "Jogo criado com sucesso",
        id: id
    });
}

export async function atualizar(req, res) {
    const { nome, genero } = req.body;
    const jogo = await jogoModels.buscarJogos(req.params.id);

    if (!jogo) {
        return res.status(404).json({ msg: "Jogo não encontrado" });
    }

    await jogoModels.atualizarJogo(req.params.id, nome, genero);

    res.json({ msg: "Jogo atualizado com sucesso" });
}

export async function deletar(req,res) {
    const jogo = await jogoModels.buscarJogos(req.params.id)

    if (!jogo){
        return res.status(404).json({msg: "Jogo não encontrado"})
    }
    await jogoModels.deletarJogo(req.params.id)

    res.status(200).json({msg: "Jogo deletado com sucesso"})
} 