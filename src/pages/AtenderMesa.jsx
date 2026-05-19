import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/Layout'

const API = 'http://localhost:4000/api'

function AtenderMesa() {
  const navigate = useNavigate()
  const [clientes,    setClientes]    = useState([])
  const [alimentos,   setAlimentos]   = useState([])
  const [promociones, setPromociones] = useState([])
  const [items,       setItems]       = useState([])       // productos en el pedido
  const [clienteSel,  setClienteSel]  = useState('')
  const [promoSel,    setPromoSel]    = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [busqueda,    setBusqueda]    = useState('')
  const [exito,       setExito]       = useState('')
  const [error,       setError]       = useState('')
  const [cargando,    setCargando]    = useState(false)

  useEffect(() => {
    axios.get(`${API}/auth/clientes`).then(r => setClientes(r.data)).catch(() => {})
    axios.get(`${API}/alimentos`).then(r => setAlimentos(r.data)).catch(() => {})
    axios.get(`${API}/promociones`).then(r => setPromociones(r.data)).catch(() => {})
  }, [])

  // Calcular totales
  const subtotal  = items.reduce((s, i) => s + parseFloat(i.costo) * i.cantidad, 0)
  const piezas    = items.reduce((s, i) => s + i.cantidad, 0)
  const descuento = 0  // sin lógica de promo por ahora
  const total     = subtotal - descuento

  const clienteNombre = clientes.find(c => c.nombre_usuario === clienteSel)
  const clienteLabel  = clienteNombre ? `${clienteNombre.nombre} ${clienteNombre.apellido_Paterno}` : '—'

  const agregarProducto = (alimento) => {
    setItems(prev => {
      const existe = prev.find(i => i.id === alimento.id_alimentosbebidas)
      if (existe) return prev.map(i => i.id === alimento.id_alimentosbebidas ? { ...i, cantidad: i.cantidad + 1 } : i)
      return [...prev, { id: alimento.id_alimentosbebidas, nombre: alimento.nombre, costo: alimento.costo, cantidad: 1 }]
    })
    setModalAbierto(false)
    setBusqueda('')
  }

  const cambiarCantidad = (id, delta) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i))
  }

  const quitarItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const abrirComanda = async () => {
    if (items.length === 0) return setError('Agrega al menos un platillo.')
    setError(''); setCargando(true)
    try {
      const codigounico = Date.now() % 1000000
      await axios.post(`${API}/tickets`, {
        precio_final: total.toFixed(2),
        nombre_usuario: clienteSel || null,
        codigounico,
        id_promocion: promoSel || null,
      })
      setExito(`¡Ticket #${codigounico} creado correctamente!`)
      setItems([])
      setClienteSel('')
      setPromoSel('')
      setTimeout(() => navigate('/tickets/'), 1500)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear el ticket.')
    } finally {
      setCargando(false)
    }
  }

  const alimentosFiltrados = alimentos.filter(a =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <Layout>
      <div style={{ padding: '32px 36px', backgroundColor: '#f7f3ec', minHeight: '100%' }}>

        {/* ENCABEZADO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0, color: '#1a1a2e' }}>Atender Mesa</h1>
            <p style={{ color: '#999', fontSize: '13px', margin: '4px 0 0' }}>Selecciona cliente, productos y la promocion que deseas aplicar.</p>
          </div>
          <button onClick={() => navigate('/tickets/')} style={{ backgroundColor: 'white', border: '1.5px solid #e0d8cc', color: '#555', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            Nuevo ticket
          </button>
        </div>

        {/* Alertas */}
        {error && <div style={{ backgroundColor: '#fdecea', color: '#c0392b', padding: '10px 14px', borderRadius: '6px', marginBottom: '12px', fontSize: '13px' }}>{error}</div>}
        {exito && <div style={{ backgroundColor: '#eafaf1', color: '#1e8449', padding: '10px 14px', borderRadius: '6px', marginBottom: '12px', fontSize: '13px' }}>{exito}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', alignItems: 'flex-start' }}>

          {/* IZQUIERDA */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e8e4dc' }}>

            {/* DATOS DEL PEDIDO */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0ebe0' }}>
              <p style={secLabel}>DATOS DEL PEDIDO</p>

              <label style={lbl}>CLIENTE</label>
              <select style={sel} value={clienteSel} onChange={e => setClienteSel(e.target.value)}>
                <option value="">Selecciona un cliente...</option>
                {clientes.map(c => (
                  <option key={c.nombre_usuario} value={c.nombre_usuario}>
                    {c.nombre} {c.apellido_Paterno} ({c.nombre_usuario})
                  </option>
                ))}
              </select>

              {/* Tabla productos */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 32px', padding: '6px 0', borderBottom: '1px solid #f0ebe0' }}>
                  <span style={colLbl}>PRODUCTO</span>
                  <span style={{ ...colLbl, textAlign: 'center' }}>CANTIDAD</span>
                  <span style={{ ...colLbl, textAlign: 'right' }}>IMPORTE</span>
                  <span />
                </div>

                {items.length === 0 ? (
                  <div style={{ padding: '32px 0', textAlign: 'center', color: '#ccc' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🍽️</div>
                    <p style={{ margin: 0, fontSize: '13px' }}>Agrega platillos con el botón de abajo</p>
                  </div>
                ) : items.map(item => (
                  <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 32px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f8f4ef' }}>
                    <span style={{ fontSize: '13px', color: '#333' }}>{item.nombre}</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <button onClick={() => cambiarCantidad(item.id, -1)} style={btnQty}>−</button>
                      <span style={{ fontSize: '13px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{item.cantidad}</span>
                      <button onClick={() => cambiarCantidad(item.id, +1)} style={btnQty}>+</button>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#c8922a', textAlign: 'right' }}>
                      ${(parseFloat(item.costo) * item.cantidad).toFixed(2)}
                    </span>
                    <button onClick={() => quitarItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: '16px', padding: '0 4px' }}>×</button>
                  </div>
                ))}
              </div>

              {/* Botón agregar */}
              <button onClick={() => setModalAbierto(true)} style={{ width: '100%', marginTop: '16px', padding: '11px', border: '2px dashed #d8d0c4', borderRadius: '8px', backgroundColor: 'transparent', color: '#aaa', fontSize: '13px', cursor: 'pointer' }}>
                + Agregar platillo
              </button>
            </div>

            {/* PROMOCION */}
            <div style={{ padding: '20px 24px' }}>
              <div style={{ border: '1px solid #e8e4dc', borderRadius: '8px', padding: '14px 16px' }}>
                <p style={{ ...secLabel, marginBottom: '10px' }}>PROMOCION APLICADA</p>
                <select style={{ ...sel, marginBottom: '6px' }} value={promoSel} onChange={e => setPromoSel(e.target.value)}>
                  <option value="">Sin promocion</option>
                  {promociones.map(p => (
                    <option key={p.id_promocion} value={p.id_promocion}>{p.nombre}</option>
                  ))}
                </select>
                <p style={{ margin: 0, fontSize: '12px', color: '#bbb' }}>Agrega productos para calcular una recomendacion.</p>
              </div>
            </div>

            {/* BOTÓN PRINCIPAL */}
            <div style={{ padding: '0 24px 24px' }}>
              <button onClick={abrirComanda} disabled={cargando || items.length === 0} style={{ width: '100%', padding: '14px', backgroundColor: items.length === 0 ? '#e0d8cc' : '#c8922a', color: items.length === 0 ? '#aaa' : 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: items.length === 0 ? 'not-allowed' : 'pointer', letterSpacing: '0.5px' }}>
                {cargando ? 'Creando ticket...' : 'Abrir comanda'}
              </button>
            </div>
          </div>

          {/* DERECHA — RESUMEN */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e8e4dc', padding: '20px 24px' }}>
            <p style={secLabel}>RESUMEN DEL PEDIDO</p>

            <ResumenFila label="Piezas"    valor={piezas}                        color="#1a1a2e" />
            <ResumenFila label="Subtotal"  valor={`$${subtotal.toFixed(2)}`}     color="#c8922a" />
            <ResumenFila label="Descuento" valor={`$${descuento.toFixed(2)}`}    color="#1a1a2e" bold />

            <div style={{ borderTop: '2px solid #f0ebe0', margin: '12px 0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#c8922a' }}>${total.toFixed(2)}</span>
            </div>

            <ResumenFila label="Promocion" valor={promoSel ? (promociones.find(p => p.id_promocion == promoSel)?.nombre || '—') : 'Sin promocion'} color="#999" />
            <ResumenFila label="Cliente"   valor={clienteLabel} color="#999" />

            <div style={{ borderTop: '1px solid #f0ebe0', marginTop: '16px', paddingTop: '14px', textAlign: 'right' }}>
              <span onClick={() => navigate('/tickets/')} style={{ fontSize: '12px', color: '#c8922a', cursor: 'pointer', fontWeight: 600 }}>
                Ver todos los tickets →
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL SELECCIONAR PLATILLO */}
      {modalAbierto && (
        <div onClick={() => setModalAbierto(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: 'white', borderRadius: '12px', width: '480px', maxHeight: '70vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>Seleccionar platillo</span>
              <button onClick={() => setModalAbierto(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#aaa' }}>×</button>
            </div>
            <div style={{ padding: '12px 20px', borderBottom: '1px solid #f0f0f0' }}>
              <input autoFocus placeholder="Buscar platillo..." value={busqueda} onChange={e => setBusqueda(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e0e0e0', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {alimentosFiltrados.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#bbb', padding: '30px', fontSize: '13px' }}>Sin resultados</p>
              ) : alimentosFiltrados.map(a => (
                <div key={a.id_alimentosbebidas} onClick={() => agregarProducto(a)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', cursor: 'pointer', borderBottom: '1px solid #f8f8f8' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fdf9f4'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#333' }}>{a.nombre}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#aaa' }}>{a.descripcion}</p>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#c8922a', marginLeft: '16px' }}>${parseFloat(a.costo).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

function ResumenFila({ label, valor, color, bold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <span style={{ fontSize: '13px', color: '#888' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: bold ? 700 : 400, color: color || '#333' }}>{valor}</span>
    </div>
  )
}

const secLabel = { margin: '0 0 14px', fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '1px' }
const lbl = { display: 'block', fontSize: '10px', fontWeight: 700, color: '#aaa', letterSpacing: '1.5px', marginBottom: '6px' }
const sel = { width: '100%', padding: '10px 12px', border: '1.5px solid #e8e4dc', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box', outline: 'none', color: '#333', backgroundColor: 'white' }
const colLbl = { fontSize: '10px', fontWeight: 700, color: '#aaa', letterSpacing: '1px' }
const btnQty = { width: '22px', height: '22px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: 'white', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }

export default AtenderMesa
