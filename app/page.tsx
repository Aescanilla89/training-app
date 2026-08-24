export default function Home() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#1e293b', color: 'white' }}>
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #475569', padding: '1rem' }}>
        <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Mi App de Entrenamiento</h1>
          <p style={{ color: '#cbd5e1', margin: 0 }}>Semana 1 - Base</p>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: '60rem', margin: '0 auto', width: '100%', padding: '1.5rem' }}>
        <div style={{ backgroundColor: '#334155', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '1rem', border: '1px solid #475569' }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>Hola 👋</h2>
          <p style={{ margin: 0, color: '#e2e8f0' }}>La app se está cargando...</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div style={{ backgroundColor: '#475569', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.5rem 0' }}>SEMANA ACTUAL</p>
            <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#60a5fa', margin: 0 }}>1/43</p>
          </div>
          <div style={{ backgroundColor: '#475569', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.5rem 0' }}>PROGRESO</p>
            <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#4ade80', margin: 0 }}>2%</p>
          </div>
        </div>
      </main>

      <footer style={{ backgroundColor: '#0f172a', borderTop: '1px solid #475569', padding: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
        Versión responsive
      </footer>
    </div>
  );
}
