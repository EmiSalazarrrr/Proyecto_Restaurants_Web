function AgregarTicket() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <header style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '1px' }}>Restaurants</h1>
        <span style={{ fontSize: '13px', color: '#a0a0c0' }}>Mi cuenta</span>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ backgroundColor: 'white', border: '1.5px solid #ddd', borderRadius: '10px', padding: '36px 32px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>

          <div style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>🎫 Agrega tu ticket</div>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.5, marginBottom: '28px' }}>Agrega el unicode que viene en tu ticket de compra</p>

          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a2e', marginBottom: '8px', display: 'block' }}>Código:</label>
          <input
            type="text"
            placeholder="Ej. ABC-123456"
            maxLength={20}
            style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #ddd', borderRadius: '8px', fontSize: '15px', color: '#1a1a2e', backgroundColor: '#fafafa', outline: 'none', letterSpacing: '1px' }}
          />

          <button style={{ width: '100%', marginTop: '20px', padding: '14px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
            Agregar
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            <a href="/menu-cliente/" style={{ width: '100%', padding: '13px', backgroundColor: 'white', color: '#1a1a2e', border: '1.5px solid #ddd', borderRadius: '8px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', textAlign: 'center', display: 'block' }}>
              ← Regresar
            </a>
            <a href="/historial/" style={{ width: '100%', padding: '13px', backgroundColor: 'white', color: '#1a1a2e', border: '1.5px solid #ddd', borderRadius: '8px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', textAlign: 'center', display: 'block' }}>
              📋 Ver historial de consumos
            </a>
          </div>

        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '16px', fontSize: '12px', color: '#aaa' }}>
        Restaurants © 2026
      </footer>

    </div>
  )
}

export default AgregarTicket