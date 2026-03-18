import conexao from "../config/db.js"

export async function listarPlayers() {
    const [resultado] = await conexao.query("SELECT id, nickname, plataforma, criado_em FROM players");
    return resultado
}

export async function buscarPlayer(id) {
    const [resultado] = await conexao.query(
        "SELECT * FROM players WHERE id = ?",
        [id]
    );

    return resultado;
}

export async function criarPlayer({nickname,plataforma}) {
    const [resultado] = await conexao.query(
        "INSERT INTO players (nickname, plataforma) VALUES (?, ?)",
        [nickname, plataforma]
    )
    return resultado.insertId;
}

export async function deletarPlayer(id) {
    const [resultado] = await conexao.query(
        "DELETE FROM players WHERE id = ?",
        [id]
    );
    return resultado
}