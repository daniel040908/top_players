import connection from "../config/db.js";


export async function listarPartidas() {
    const [rows] = await connection.query(`
        SELECT p.*, 
               u1.nome as jogador1_nome, 
               u2.nome as jogador2_nome,
               j.titulo as jogo_titulo
        FROM partidas p
        LEFT JOIN usuarios u1 ON p.jogador1_id = u1.id
        LEFT JOIN usuarios u2 ON p.jogador2_id = u2.id
        LEFT JOIN jogos j ON p.jogo_id = j.id
        ORDER BY p.data_partida DESC
    `);
    return rows;
}



export async function criarPartida(data) {
    const { jogo_id, jogador1_id, jogador2_id, pontuacao_jogador1, pontuacao_jogador2, data_partida, status } = data;
    
    const [result] = await connection.query(
        `INSERT INTO partidas 
         (jogo_id, jogador1_id, jogador2_id, pontuacao_jogador1, pontuacao_jogador2, data_partida, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [jogo_id, jogador1_id, jogador2_id, pontuacao_jogador1 || 0, pontuacao_jogador2 || 0, data_partida, status || 'pendente']
    );
    
    return result.insertId;
}


export async function deletarPartida(id) {
    const [result] = await connection.query("DELETE FROM partidas WHERE id = ?", [id]);
    return result.affectedRows > 0;
}