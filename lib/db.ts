import { sql } from '@neondatabase/serverless';

export async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS training_data (
        id SERIAL PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Base de datos inicializada');
  } catch (error) {
    console.error('Error inicializando BD:', error);
  }
}

export async function getTrainingData() {
  try {
    const result = await sql`
      SELECT data FROM training_data ORDER BY updated_at DESC LIMIT 1
    `;
    return result.rows[0]?.data || null;
  } catch (error) {
    console.error('Error leyendo datos:', error);
    return null;
  }
}

export async function saveTrainingData(data: any) {
  try {
    const existing = await sql`SELECT id FROM training_data LIMIT 1`;

    if (existing.rows.length > 0) {
      await sql`
        UPDATE training_data
        SET data = ${JSON.stringify(data)}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${existing.rows[0].id}
      `;
    } else {
      await sql`
        INSERT INTO training_data (data)
        VALUES (${JSON.stringify(data)})
      `;
    }
    return true;
  } catch (error) {
    console.error('Error guardando datos:', error);
    return false;
  }
}
