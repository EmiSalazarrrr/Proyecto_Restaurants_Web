function MenuAdmin() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <header style={{ backgroundColor: '#1a1a2e', color: 'white', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '1px' }}>Restaurants</h1>
        <span style={{ fontSize: '13px', color: '#a0a0c0' }}>Panel Administrador</span>
      </header>

      {/* CONTENIDO */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', color: '#1a1a2e', marginBottom: '8px' }}>Bienvenido, Administrador</h2>
          <p style={{ fontSize: '14px', color: '#666' }}>Selecciona una opción para continuar</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', width: '100%', maxWidth: '500px' }}>
          {[
            { icon: '🍽️', label: 'Alimentos / Bebidas', href: '#' },
            { icon: '🪑', label: 'Atender Mesa', href: '#' },
            { icon: '🎁', label: 'Configurar Promociones', href: '#' },
            { icon: '📊', label: 'Consultar Métricas Diarias', href: '#' },
          ].map((item, i) => (
            <a key={i} href={item.href} style={{
              backgroundColor: 'white', border: '1.5px solid #ddd', borderRadius: '8px',
              padding: '24px 16px', fontSize: '14px', fontWeight: 500, color: '#1a1a2e',
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '10px', textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}>
              <span style={{ fontSize: '28px' }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>

        <a href="/" style={{
          marginTop: '20px', width: '100%', maxWidth: '500px', padding: '12px',
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

export default MenuAdmin