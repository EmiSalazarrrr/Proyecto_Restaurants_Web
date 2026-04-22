function Login() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      
      {/* LADO IZQUIERDO */}
      <div style={{
        width: '50%',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 30%, #0d2137 60%, #1a3a2a 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '40px' }}>
          <div style={{ width: '40px', height: '1px', background: 'rgba(255,200,80,0.6)', margin: '0 auto 30px' }}></div>
          <h1 style={{ fontSize: '52px', fontWeight: 100, letterSpacing: '16px', color: 'white', textTransform: 'uppercase', marginBottom: '20px' }}>Welcome</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,200,80,0.85)', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '28px' }}>✦ Restaurants ✦</p>
          <div style={{ width: '40px', height: '1px', background: 'rgba(255,200,80,0.4)', margin: '0 auto 28px' }}></div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '2px', lineHeight: 2, textTransform: 'uppercase' }}>
            Tu historial<br />y recompensas<br />en un solo lugar
          </p>
        </div>
        <span style={{ position: 'absolute', bottom: '30px', fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '3px' }}>© 2026</span>
      </div>

      {/* LADO DERECHO */}
      <div style={{
        width: '50%', background: '#f7f7f9', display: 'flex',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 80px'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 400, color: '#12122a', marginBottom: '8px', letterSpacing: '1px' }}>Iniciar Sesión</h2>
          <p style={{ fontSize: '13px', color: '#888', marginBottom: '48px' }}>Ingresa tus credenciales para continuar</p>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#555', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 600 }}>Usuario</label>
            <input type="text" placeholder="Tu nombre de usuario" style={{ width: '100%', border: 'none', borderBottom: '1.5px solid #d0d0d8', padding: '10px 0', fontSize: '15px', color: '#12122a', outline: 'none', background: 'transparent' }} />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#555', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 600 }}>Contraseña</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%', border: 'none', borderBottom: '1.5px solid #d0d0d8', padding: '10px 0', fontSize: '15px', color: '#12122a', outline: 'none', background: 'transparent' }} />
          </div>

          <button style={{ width: '100%', padding: '16px', backgroundColor: '#12122a', color: 'white', border: 'none', borderRadius: '4px', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', cursor: 'pointer', marginTop: '16px' }}>
            Ingresar
          </button>

          <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '13px', color: '#888' }}>
            ¿No tienes cuenta? <a href="/registro/" style={{ color: '#12122a', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #12122a', paddingBottom: '1px' }}>Regístrate aquí</a>
          </div>

          <div style={{ marginTop: '60px', fontSize: '10px', color: '#817f7f', letterSpacing: '3px', textAlign: 'center', textTransform: 'uppercase' }}>
            Restaurants © 2026
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;