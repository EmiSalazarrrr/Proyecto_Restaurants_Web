function Historial() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <header style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '1px' }}>Restaurants</h1>
        <span style={{ fontSize: '13px', color: '#a0a0c0' }}>Mi cuenta</span>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>

        <div style={{ width: '100%', maxWidth: '860px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a2e', marginBottom: '6px' }}>📋 Historial</h2>
          <p style={{ fontSize: '14px', color: '#666' }}>Consulta de historial con tus consumos previos</p>
        </div>

        <a href="/menu-cliente/" style={{ display: 'inline-block', marginBottom: '24px', padding: '11px 20px', backgroundColor: 'white', color: '#1a1a2e', border: '1.5px solid #ddd', borderRadius: '8px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', alignSelf: 'flex-start' }}>
          ← Regresar
        </a>

        <div style={{ width: '100%', maxWidth: '860px', backgroundColor: 'white', border: '1.5px solid #ddd', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
              <tr>
                {['Fecha', 'Alimentos / Bebidas', 'Total', 'Descuento', 'Precio Final'].map((col) => (
                  <th key={col} style={{ padding: '14px 18px', textAlign: 'left', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#aaa' }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>🧾</div>
                    <p style={{ fontSize: '14px' }}>Aún no tienes consumos registrados.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <footer style={{ textAlign: 'center', padding: '16px', fontSize: '12px', color: '#aaa' }}>
        Restaurants © 2026
      </footer>

    </div>
  )
}

export default Historial