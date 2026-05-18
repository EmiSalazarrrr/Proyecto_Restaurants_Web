import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

const menuItems = [
  { icon: '⊞', label: 'Dashboard', href: '/menu-admin/' },
  { icon: '🍽️', label: 'Alimentos / Bebidas', href: '/alimentos/' },
  { icon: '📂', label: 'Categorías', href: '#' },
  { icon: '🪑', label: 'Atender mesa', href: '/atender-mesa/' },
  { icon: '🎫', label: 'Tickets', href: '/tickets/' },
  { icon: '🎁', label: 'Promociones', href: '#' },
  { icon: '📊', label: 'Metricas', href: '#' },
]

function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)

  const bg = darkMode ? '#0f0f1a' : '#1a1a2e'
  const contentBg = darkMode ? '#1a1a2e' : '#f5f6fa'
  const textColor = darkMode ? '#e0e0e0' : '#1a1a2e'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* SIDEBAR */}
      <aside style={{
        width: '200px', minWidth: '200px', backgroundColor: bg,
        display: 'flex', flexDirection: 'column', padding: '0',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '16px', letterSpacing: '2px' }}>
            REST<span style={{ color: '#f0c040' }}>AU</span>RANTS
          </span>
        </div>

        {/* Panel label */}
        <div style={{ padding: '16px 20px 8px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px' }}>PANEL</span>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1 }}>
          {menuItems.map((item, i) => {
            const active = location.pathname === item.href
            return (
              <div
                key={i}
                onClick={() => item.href !== '#' && navigate(item.href)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 20px', cursor: item.href !== '#' ? 'pointer' : 'default',
                  backgroundColor: active ? 'rgba(240,192,64,0.15)' : 'transparent',
                  borderLeft: active ? '3px solid #f0c040' : '3px solid transparent',
                  color: active ? '#f0c040' : 'rgba(255,255,255,0.7)',
                  fontSize: '13px', fontWeight: active ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '15px' }}>{item.icon}</span>
                {item.label}
              </div>
            )
          })}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 0' }}>
          <div
            onClick={() => setDarkMode(!darkMode)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}
          >
            <span>{darkMode ? '☀️' : '🌙'}</span> Modo {darkMode ? 'claro' : 'oscuro'}
          </div>
          <div
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}
          >
            <span>🚪</span> Cerrar sesion
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, backgroundColor: contentBg, color: textColor, overflowY: 'auto' }}>
        {children}
      </main>

    </div>
  )
}

export default Layout
