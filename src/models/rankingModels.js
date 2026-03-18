import {pool} from "../config/db.js"

export async function rankingPorJogo(jogo_id, limite = 10) {
    const [rows] = await pool.query(
    `
    SELECT 
	jogo_id, 
    jogo_nome,
	player_id,
	nickname, 
	plataforma,
	total_pontos,
	total_partidas
    FROM jogo_id = ?
    ORDER BY total_pontos DESC
    LIMIT ?
    `,
    [jogo_id, Number(limite)]
    );
    return rows;
}

export async function rankingGeral(limite = 10) {
    const [rows] = await pool.query(
        `
      SELECT 
	    p.jogo_id, 
	    p.player_id,
	    j.nome AS jogo_nome,
	    pl.nickname, 
	    pl.plataforma,
	    SUM(p.pontos) AS total_pontos,
	    COUNT(*) AS total_partidas
    FROM partidas p
    JOIN jogos j ON j.id = p.jogo_id
    JOIN players pl ON  pl.id = p.player_id
    GROUP BY p.jogo_id, j.nome, p.player_id, pl.nickname, pl.plataforma
    ORDER BY total_pontos DESC;
        `,
        [(Number(limite))]
    );
    return rows;
}