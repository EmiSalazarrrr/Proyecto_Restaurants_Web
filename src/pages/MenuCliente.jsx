function MenuCliente() {
  const estiloBtn = {
    backgroundColor: 'white', border: '1.5px solid #ddd', borderRadius: '8px',
    padding: '20px 24px', fontSize: '15px', fontWeight: 500, color: '#1a1a2e',
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px',
    textDecoration: 'none', transition: 'all 0.2s ease'
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <header style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '1px' }}>Restaurants</h1>
        <span style={{ fontSize: '13px', color: '#a0a0c0' }}>Mi cuenta</span>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '26px', color: '#1a1a2e', marginBottom: '10px' }}>¡Bienvenido! 👋</h2>
          <p style={{ fontSize: '15px', color: '#666', maxWidth: '320px', lineHeight: 1.5 }}>Gestiona tus consumos, historial y recompensas desde aquí</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
          <a href="/agregar-ticket/" style={estiloBtn}>
            <span style={{ fontSize: '22px', width: '30px', textAlign: 'center' }}>🎫</span>
            Agregar Ticket
          </a>
          <a href="/historial/" style={estiloBtn}>
            <span style={{ fontSize: '22px', width: '30px', textAlign: 'center' }}>📋</span>
            Ver Historial
          </a>
        </div>

        <a href="/" style={{
          marginTop: '24px', width: '100%', maxWidth: '400px', padding: '14px',
          backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px',
          fontSize: '14px', fontWeight: 500, cursor: 'pointer', textDecoration: 'none',
          textAlign: 'center', display: 'block'
        }}>
          Cerrar Sesión
        </a>

      </div>

      <footer style={{ textAlign: 'center', padding: '16px', fontSize: '12px', color: '#aaa' }}>
        Restaurants © 2026
      </footer>

    </div>
  )
}

export default MenuCliente