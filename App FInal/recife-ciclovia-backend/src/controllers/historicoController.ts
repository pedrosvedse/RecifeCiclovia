import { Request, Response } from "express";
import db from "../database/db";
import { HistoricoInput, HistoricoRecord } from "../models/Historico";

// POST /historico
// Recebe localização + dados da ciclovia e salva no banco
export function saveHistorico(req: Request, res: Response): void {
  const { lat, lng, ciclovia_id, nome, distancia_m } = req.body as HistoricoInput;

  // Validação básica dos campos obrigatórios
  if (!lat || !lng || !ciclovia_id || !nome || distancia_m === undefined) {
    res.status(400).json({ error: "Campos obrigatórios: lat, lng, ciclovia_id, nome, distancia_m" });
    return;
  }

  const stmt = db.prepare(`
    INSERT INTO historico (lat, lng, ciclovia_id, nome, distancia_m)
    VALUES (@lat, @lng, @ciclovia_id, @nome, @distancia_m)
  `);

  const result = stmt.run({ lat, lng, ciclovia_id, nome, distancia_m });

  res.status(201).json({
    message: "Registro salvo com sucesso.",
    id: result.lastInsertRowid,
  });
}

// GET /historico
// Retorna todos os registros ordenados do mais recente ao mais antigo
export function getHistorico(_req: Request, res: Response): void {
  const rows = db.prepare(`
    SELECT * FROM historico ORDER BY id DESC
  `).all() as HistoricoRecord[];

  res.status(200).json(rows);
}