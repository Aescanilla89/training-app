import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@neondatabase/serverless';

function checkAuth(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  return token?.value === 'verified';
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const result = await sql`
      SELECT data FROM training_data ORDER BY updated_at DESC LIMIT 1
    `;
    const data = result.rows[0]?.data || null;
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error al leer datos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { data } = await request.json();

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error al guardar datos' }, { status: 500 });
  }
}
