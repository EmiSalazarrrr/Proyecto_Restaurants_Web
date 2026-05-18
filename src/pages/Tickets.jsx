import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/Layout'

const API = 'http://localhost:4000/api/tickets'

const FILTROS = ['Hoy', 'Semana', 'Mes', 'Año']

function Tickets() {
  const navigate = useNavigate()
  const [tickets, setTickets]   = useState([])
  const [filtro, setFiltro]     = useState('Hoy')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin]       = useState('')
  const [error, setError]       = useState('')
  const [exito, setExito]       = useState('')

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    const { data } = await axios.get(API)
    setTickets(data)
  }

  const handleEliminar = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este ticket?')) return
    try {
      await axios.delete(`${API}/${id}`)
      setExito('Ticket eliminado.')
      cargar()
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar.')
    }
  }

  // Filtrar por periodo
  const ticketsFiltrados = tickets.filter(t => {
    const fecha = new Date(t.fecha)
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)

    if (fechaInicio && fechaFin) {
      const ini = new Date(fechaInicio)
      const fin = new Date(fechaFin)
      fin.setHours(23, 59, 59)
      return fecha >= ini && fecha <= fin
    }

    if (filtro === 'Hoy') {
      return fecha >= hoy
    } else if (filtro === 'Semana') {
      const semana = new Date(hoy); semana.setDate(hoy.getDate() - 7)
      return fecha >= semana
    } else if (filtro === 'Mes') {
      const mes = new Date(hoy); mes.setMonth(hoy.getMonth() - 1)
      return fecha >= mes
    } else if (filtro === 'Año') {
      const anio = new Date(hoy); anio.setFullYear(hoy.getFullYear() - 1)
      return fecha >= anio
    }
    return true
  })

  const totalTickets  = ticketsFiltrados.length
  const pagados       = ticketsFiltrados.filter(t => t.canjeado).length
  const porCobrar     = ticketsFiltrados.filter(t => !t.canjeado).length
  const ingresos      = ticketsFiltrados.filter(t => t.canjeado).reduce((s, t) => s + parseFloat(t.precio_final), 0)

  const hoyStr = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <Layout>
      <div style={{ padding: '32px 36px', backgroundColor: '#f7f3ec', minHeight: '100%' }}>

        {/* ENCABEZADO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#1a1a2e' }}>Tickets registrados</h1>
            <p style={{ fontSize: '13px', color: '#999', margin: '4px 0 0' }}>Hoy — {hoyStr}</p>
          </div>
          <button onClick={() => navigate('/menu-admin/')} style={{ backgroundColor: '#c8922a', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            ← Atender Mesa
          </button>
        </div>

        {/* Alertas */}
        {error && <div style={{ backgroundColor: '#fdecea', color: '#c0392b', padding: '10px 14px', borderRadius: '6px', marginBottom: '12px', fontSize: '13px' }}>{error}</div>}
        {exito && <div style={{ backgroundColor: '#eafaf1', color: '#1e8449', padding: '10px 14px', borderRadius: '6px', marginBottom: '12px', fontSize: '13px' }}>{exito}</div>}

        {/* FILTROS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {FILTROS.map(f => (
            <button key={f} onClick={() => { setFiltro(f); setFechaInicio(''); setFechaFin('') }}
              style={{ padding: '7px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: 'none', backgroundColor: filtro === f && !fechaInicio ? '#1a1a2e' : '#e8e4dc', color: filtro === f && !fechaInicio ? 'white' : '#555' }}>
              {f}
            </button>
          ))}
          <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)}
            style={{ padding: '7px 10px', border: '1.5px solid #ddd', borderRadius: '6px', fontSize: '13px', backgroundColor: 'white', color: '#333' }} />
          <span style={{ color: '#aaa' }}>—</span>
          <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)}
            style={{ padding: '7px 10px', border: '1.5px solid #ddd', borderRadius: '6px', fontSize: '13px', backgroundColor: 'white', color: '#333' }} />
          <button onClick={() => { setFiltro(''); }} style={{ padding: '7px 16px', backgroundColor: '#c8922a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Aplicar
          </button>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 1.5fr', gap: '12px', marginBottom: '20px' }}>
          <StatCard label="TOTAL TICKETS"    value={totalTickets} color="#1a1a2e" />
          <StatCard label="INGRESOS COBRADOS" value={`$${ingresos.toFixed(2)}`} color="#1a1a2e" />
          <StatCard label="POR COBRAR"        value={porCobrar}   color="#3498db" />
          <StatCard label="PAGADOS"           value={pagados}     color="#27ae60" />
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e8e4dc', padding: '16px 20px' }}>
            <p style={statLbl}>DISTRIBUCIÓN DE TICKETS</p>
            {totalTickets === 0 ? (
              <p style={{ fontSize: '12px', color: '#bbb', marginTop: '12px' }}>Sin datos para el periodo</p>
            ) : (
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#27ae60' }}>Pagados</span>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>{totalTickets ? Math.round(pagados / totalTickets * 100) : 0}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${totalTickets ? (pagados / totalTickets * 100) : 0}%`, backgroundColor: '#27ae60', borderRadius: '3px' }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TABLA */}
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e8e4dc', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                {['TICKET','CLIENTE','PROMOCIÓN','PAGO','TOTAL','FECHA','ESTADO','ACCIONES'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ticketsFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#bbb', fontSize: '13px' }}>
                    No hay tickets registrados para este periodo.
                  </td>
                </tr>
              ) : ticketsFiltrados.map(t => (
                <tr key={t.id_ticket} style={{ borderBottom: '1px solid #f8f8f8' }}>
                  <td style={td}><strong>#{t.codigounico}</strong></td>
                  <td style={{ ...td, color: '#666' }}>{t.nombre_usuario || '—'}</td>
                  <td style={{ ...td, color: '#aaa' }}>—</td>
                  <td style={{ ...td, color: '#aaa' }}>—</td>
                  <td style={{ ...td, fontWeight: 600, color: '#c8922a' }}>${parseFloat(t.precio_final).toFixed(2)}</td>
                  <td style={{ ...td, color: '#999', fontSize: '12px' }}>{new Date(t.fecha).toLocaleDateString('es-MX')}</td>
                  <td style={td}>
                    <span style={{ backgroundColor: t.canjeado ? '#eafaf1' : '#fef9ec', color: t.canjeado ? '#27ae60' : '#c8922a', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>
                      {t.canjeado ? 'Pagado' : 'Por cobrar'}
                    </span>
                  </td>
                  <td style={td}>
                    <button onClick={() => handleEliminar(t.id_ticket)} style={{ backgroundColor: '#fdecea', color: '#e74c3c', border: 'none', padding: '5px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e8e4dc', padding: '16px 20px' }}>
      <p style={statLbl}>{label}</p>
      <p style={{ margin: '8px 0 0', fontSize: '26px', fontWeight: 700, color }}>{value}</p>
    </div>
  )
}

const statLbl = { margin: 0, fontSize: '10px', fontWeight: 700, color: '#aaa', letterSpacing: '1px' }
const td = { padding: '12px 16px', fontSize: '13px' }

export default Tickets
