import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:4000/api'

function MenuCliente() {
  const navigate = useNavigate()
  const usuario = localStorage.getItem('usuario') || 'cliente'
  const nombre  = localStorage.getItem('nombre')  || 'Cliente'

  const [stats, setStats]       = useState({ visitas: 0, consumido: 0, productos: 0 })
  const [tickets, setTickets]   = useState([])
  const [alimentos, setAlimentos] = useState([])
  const [modoClaro, setModoClaro] = useState(false)

  useEffect(() => {
    axios.get(`${API}/clientes/${usuario}/stats`).then(r => setStats(r.data)).catch(() => {})
    axios.get(`${API}/clientes/${usuario}/tickets`).then(r => setTickets(r.data)).catch(() => {})
    axios.get(`${API}/alimentos`).then(r => setAlimentos(r.data)).catch(() => {})
  }, [usuario])

  const bg       = modoClaro ? '#f5f6fa' : '#12122a'
  const cardBg   = modoClaro ? 'white'   : '#1a1a3a'
  const txtMain  = modoClaro ? '#1a1a2e' : 'white'
  const txtSub   = modoClaro ? '#666'    : 'rgba(255,255,255,0.55)'
  const border   = modoClaro ? '#e0e0e0' : 'rgba(255,255,255,0.08)'

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    localStorage.removeItem('nombre')
    navigate('/')
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", backgroundColor: bg, minHeight: '100vh', color: txtMain }}>

      {/* HEADER */}
      <header style={{ backgroundColor: cardBg, padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${border}` }}>
        <div>
          <span style={{ fontSize: '11px', color: txtSub, letterSpacing: '1px' }}>RESTAURANTS</span>
          <h2 style={{ margin: '2px 0 0', fontSize: '18px', fontWeight: 700 }}>
            Hola, <span style={{ color: '#f0c040' }}>{nombre}</span>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setModoClaro(!modoClaro)} style={btnHeader(cardBg, txtMain, border)}>
            {modoClaro ? '🌙 Modo oscuro' : '☀️ Modo claro'}
          </button>
          <button onClick={cerrarSesion} style={btnHeader(cardBg, txtMain, border)}>Salir</button>
        </div>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px' }}>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'VISITAS', value: stats.visitas, sub: 'Total histórico' },
            { label: 'CONSUMIDO', value: `$${parseFloat(stats.consumido).toFixed(2)}`, sub: 'Acumulado' },
            { label: 'PRODUCTOS', value: stats.productos, sub: 'Distintos' },
          ].map((s, i) => (
            <div key={i} style={{ backgroundColor: cardBg, borderRadius: '10px', padding: '20px 24px', border: `1px solid ${border}` }}>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: txtSub, letterSpacing: '1px' }}>{s.label}</p>
              <p style={{ margin: '8px 0 4px', fontSize: '28px', fontWeight: 700, color: txtMain }}>{s.value}</p>
              <p style={{ margin: 0, fontSize: '12px', color: txtSub }}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          {/* MENÚ DISPONIBLE */}
          <div style={{ backgroundColor: cardBg, borderRadius: '10px', border: `1px solid ${border}`, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${border}` }}>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Menú disponible</span>
            </div>
            <div style={{ padding: '12px 16px', maxHeight: '340px', overflowY: 'auto' }}>
              {alimentos.length === 0 ? (
                <p style={{ color: txtSub, fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>Sin productos disponibles</p>
              ) : alimentos.map(a => (
                <div key={a.id_alimentosbebidas} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 4px', borderBottom: `1px solid ${border}` }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: txtMain }}>{a.nombre}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: txtSub }}>{a.descripcion}</p>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#f0c040', marginLeft: '12px', whiteSpace: 'nowrap' }}>
                    ${parseFloat(a.costo).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ÚLTIMOS TICKETS */}
          <div style={{ backgroundColor: cardBg, borderRadius: '10px', border: `1px solid ${border}`, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${border}` }}>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Últimos 5 tickets</span>
            </div>
            <div style={{ padding: '12px 16px', maxHeight: '340px', overflowY: 'auto' }}>
              {tickets.length === 0 ? (
                <p style={{ color: txtSub, fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>Sin tickets registrados</p>
              ) : tickets.map(t => (
                <div key={t.id_ticket} style={{ padding: '12px 4px', borderBottom: `1px solid ${border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: txtMain }}>Ticket #{t.codigounico}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#f0c040' }}>${parseFloat(t.precio_final).toFixed(2)}</span>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: txtSub }}>
                    {new Date(t.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <span style={{
                    display: 'inline-block', marginTop: '6px', fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: '20px',
                    backgroundColor: t.canjeado ? 'rgba(30,132,73,0.2)' : 'rgba(231,76,60,0.15)',
                    color: t.canjeado ? '#2ecc71' : '#e74c3c'
                  }}>
                    {t.canjeado ? '✓ Canjeado' : 'Sin canjear'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const btnHeader = (cardBg, txtMain, border) => ({
  backgroundColor: 'transparent', color: txtMain, border: `1px solid ${border}`,
  padding: '7px 14px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer'
})

export default MenuCliente
