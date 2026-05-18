import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'

const API = 'http://localhost:4000/api/alimentos'

function Alimentos() {
  const [alimentos, setAlimentos] = useState([])
  const [form, setForm] = useState({ nombre: '', descripcion: '', costo: '' })
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')

  useEffect(() => { cargar() }, [])

  const cargar = async () => {
    const { data } = await axios.get(API)
    setAlimentos(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setExito('')
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form)
        setExito('Alimento actualizado correctamente.')
      } else {
        await axios.post(API, form)
        setExito('Alimento agregado correctamente.')
      }
      setForm({ nombre: '', descripcion: '', costo: '' })
      setEditId(null)
      cargar()
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar.')
    }
  }

  const handleEditar = (a) => {
    setEditId(a.id_alimentosbebidas)
    setForm({ nombre: a.nombre, descripcion: a.descripcion, costo: a.costo })
    setError(''); setExito('')
  }

  const handleEliminar = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este alimento?')) return
    try {
      await axios.delete(`${API}/${id}`)
      setExito('Alimento eliminado.')
      cargar()
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar.')
    }
  }

  const cancelar = () => {
    setEditId(null)
    setForm({ nombre: '', descripcion: '', costo: '' })
    setError(''); setExito('')
  }

  return (
    <Layout>
      <div style={{ padding: '32px 36px' }}>

        {/* Encabezado */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>Alimentos / Bebidas</h1>
          <p style={{ color: '#888', fontSize: '13px', margin: '4px 0 0' }}>Administra el catalogo de productos del restaurante.</p>
        </div>

        {/* Alertas */}
        {error && <div style={{ backgroundColor: '#fdecea', color: '#c0392b', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>{error}</div>}
        {exito && <div style={{ backgroundColor: '#eafaf1', color: '#1e8449', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>{exito}</div>}

        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

          {/* TABLA */}
          <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#888', letterSpacing: '1px' }}>ALIMENTOS REGISTRADOS</span>
              <span style={{ float: 'right', backgroundColor: '#f0c040', color: '#1a1a2e', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px' }}>
                {alimentos.length} productos
              </span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9' }}>
                  <th style={th}>NOMBRE</th>
                  <th style={th}>DESCRIPCIÓN</th>
                  <th style={th}>COSTO</th>
                  <th style={th}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {alimentos.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', padding: '30px', color: '#aaa', fontSize: '14px' }}>Sin productos registrados</td></tr>
                ) : alimentos.map(a => (
                  <tr key={a.id_alimentosbebidas} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={td}><strong>{a.nombre}</strong></td>
                    <td style={{ ...td, color: '#666' }}>{a.descripcion}</td>
                    <td style={td}>${parseFloat(a.costo).toFixed(2)}</td>
                    <td style={td}>
                      <button onClick={() => handleEditar(a)} style={btnEditar}>Editar</button>
                      <button onClick={() => handleEliminar(a.id_alimentosbebidas)} style={btnEliminar}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FORMULARIO */}
          <div style={{ width: '280px', minWidth: '280px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '1px', marginBottom: '16px' }}>
              {editId ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}
            </p>
            <form onSubmit={handleSubmit}>
              <label style={lbl}>Nombre</label>
              <input style={inp} value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Ej: Pizza Margarita" required />
              <label style={lbl}>Descripción</label>
              <input style={inp} value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} placeholder="Ej: Con queso y tomate" required />
              <label style={lbl}>Costo ($)</label>
              <input style={inp} type="number" step="0.01" min="0" value={form.costo} onChange={e => setForm({ ...form, costo: e.target.value })} placeholder="Ej: 120.00" required />
              <button type="submit" style={btnPrimario}>{editId ? 'Guardar cambios' : 'Agregar producto'}</button>
              {editId && <button type="button" onClick={cancelar} style={btnCancelar}>Cancelar</button>}
            </form>
          </div>

        </div>
      </div>
    </Layout>
  )
}

const th = { padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#888', letterSpacing: '0.5px' }
const td = { padding: '12px 16px', fontSize: '13px' }
const lbl = { display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '4px' }
const inp = { width: '100%', padding: '8px 10px', border: '1.5px solid #e0e0e0', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box', marginBottom: '12px' }
const btnPrimario = { width: '100%', backgroundColor: '#f0c040', color: '#1a1a2e', border: 'none', padding: '10px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: '8px' }
const btnCancelar = { width: '100%', backgroundColor: '#eee', color: '#555', border: 'none', padding: '9px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }
const btnEditar = { backgroundColor: '#f0c040', color: '#1a1a2e', border: 'none', padding: '5px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', marginRight: '6px' }
const btnEliminar = { backgroundColor: '#fdecea', color: '#e74c3c', border: 'none', padding: '5px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }

export default Alimentos
