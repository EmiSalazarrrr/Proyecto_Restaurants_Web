import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const avatarEmojis = ['🍽️', '🍕', '🍔', '🍜', '🍣', '🥗', '🍰', '☕']

function Registro() {
  const navigate = useNavigate()
  const [avatarSeleccionado, setAvatarSeleccionado] = useState('🍽️')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const [form, setForm] = useState({
    nombre: '', apellido_Paterno: '', apellido_materno: '',
    numero_celular: '', nombre_usuario: '', contrasena: '', contrasena2: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.contrasena !== form.contrasena2)
      return setError('Las contraseñas no coinciden.')
    if (form.contrasena.length < 6)
      return setError('La contraseña debe tener al menos 6 caracteres.')
    if (form.numero_celular.length !== 10)
      return setError('El número de celular debe tener 10 dígitos.')

    setCargando(true)
    try {
      await axios.post('http://localhost:4000/api/auth/registro', {
        nombre_usuario: form.nombre_usuario,
        nombre: form.nombre,
        apellido_Paterno: form.apellido_Paterno,
        apellido_materno: form.apellido_materno,
        numero_celular: form.numero_celular,
        contrasena: form.contrasena,
      })
      navigate('/', { state: { registrado: true } })
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse.')
    } finally {
      setCargando(false)
    }
  }

  const estiloFondo = {
    fontFamily: "'Segoe UI', Arial, sans-serif", minHeight: '100vh',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 30%, #0d2137 60%, #1a3a2a 100%)',
  }
  const estiloCard = {
    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px',
    padding: '40px 50px', width: '100%', maxWidth: '480px',
    margin: '30px 20px', position: 'relative', zIndex: 1,
  }
  const estiloInput = {
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px', padding: '12px 14px', fontSize: '14px',
    color: 'white', outline: 'none', width: '100%', boxSizing: 'border-box',
  }
  const estiloLabel = {
    fontSize: '10px', color: 'rgba(255,200,80,0.8)', letterSpacing: '1.5px',
    textTransform: 'uppercase', marginBottom: '8px', fontWeight: 500, display: 'block',
  }

  const f = (campo) => ({ target: { value } }) => setForm({ ...form, [campo]: value })

  return (
    <div style={estiloFondo}>

      {/* MODAL AVATAR */}
      {modalAbierto && (
        <div onClick={() => setModalAbierto(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'rgba(20,20,50,0.97)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '30px', width: '340px', position: 'relative' }}>
            <button onClick={() => setModalAbierto(false)} style={{ position: 'absolute', top: '14px', right: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px' }}>✕</button>
            <p style={{ fontSize: '14px', color: 'white', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px', textAlign: 'center' }}>Elige tu ícono</p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: '24px' }}>Selecciona el que más te guste</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', justifyItems: 'center' }}>
              {avatarEmojis.map((emoji, i) => (
                <div key={i} onClick={() => { setAvatarSeleccionado(emoji); setModalAbierto(false) }} style={{ width: '64px', height: '64px', fontSize: '32px', background: avatarSeleccionado === emoji ? 'rgba(255,200,80,0.2)' : 'rgba(255,255,255,0.08)', border: avatarSeleccionado === emoji ? '2px solid rgba(255,200,80,0.8)' : '2px solid transparent', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TARJETA */}
      <div style={estiloCard}>

        {/* AVATAR */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div onClick={() => setModalAbierto(true)} style={{ width: '80px', height: '80px', fontSize: '36px', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,200,80,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '8px' }}>
            {avatarSeleccionado}
          </div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>RESTAURANTS</span>
          <span onClick={() => setModalAbierto(true)} style={{ fontSize: '10px', color: 'rgba(255,200,80,0.6)', letterSpacing: '1px', cursor: 'pointer', marginTop: '6px', textTransform: 'uppercase' }}>✦ Elegir ícono</span>
        </div>

        <div style={{ width: '30px', height: '1px', background: 'rgba(255,200,80,0.3)', margin: '0 auto 20px' }}></div>
        <h2 style={{ fontSize: '24px', fontWeight: 300, color: 'white', textAlign: 'center', letterSpacing: '2px', marginBottom: '6px' }}>Crear Cuenta</h2>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', letterSpacing: '1px', marginBottom: '24px' }}>Ingresa tus datos para registrarte</p>

        {error && <div style={{ backgroundColor: 'rgba(231,76,60,0.2)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' }}>
            <div><label style={estiloLabel}>Nombre</label><input style={estiloInput} type="text" placeholder="Tu nombre" value={form.nombre} onChange={f('nombre')} required /></div>
            <div><label style={estiloLabel}>Apellido Paterno</label><input style={estiloInput} type="text" placeholder="Apellido paterno" value={form.apellido_Paterno} onChange={f('apellido_Paterno')} required /></div>
            <div><label style={estiloLabel}>Apellido Materno</label><input style={estiloInput} type="text" placeholder="Opcional" value={form.apellido_materno} onChange={f('apellido_materno')} /></div>
            <div><label style={estiloLabel}>Número de Celular</label><input style={estiloInput} type="tel" placeholder="10 dígitos" maxLength={10} value={form.numero_celular} onChange={f('numero_celular')} required /></div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={estiloLabel}>Nombre de Usuario</label>
              <input style={estiloInput} type="text" placeholder="Elige un nombre de usuario" value={form.nombre_usuario} onChange={f('nombre_usuario')} required />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={estiloLabel}>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input style={{ ...estiloInput, paddingRight: '42px' }} type={showPass ? 'text' : 'password'} placeholder="Mínimo 6 caracteres" value={form.contrasena} onChange={f('contrasena')} required />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>{showPass ? '🙈' : '👁'}</button>
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={estiloLabel}>Repetir Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input style={{ ...estiloInput, paddingRight: '42px' }} type={showPass2 ? 'text' : 'password'} placeholder="••••••••" value={form.contrasena2} onChange={f('contrasena2')} required />
                <button type="button" onClick={() => setShowPass2(!showPass2)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>{showPass2 ? '🙈' : '👁'}</button>
              </div>
            </div>
          </div>

          <button type="submit" disabled={cargando} style={{ width: '100%', padding: '15px', background: 'rgba(255,200,80,0.9)', color: '#12122a', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', cursor: cargando ? 'not-allowed' : 'pointer', marginTop: '28px', opacity: cargando ? 0.7 : 1 }}>
            {cargando ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
          ¿Ya tienes cuenta? <a href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '1px' }}>Iniciar Sesión</a>
        </div>
      </div>
    </div>
  )
}

export default Registro
