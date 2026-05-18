import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Registro from './pages/Registro'
import MenuAdmin from './pages/MenuAdmin'
import MenuCliente from './pages/MenuCliente'
import AgregarTicket from './pages/AgregarTicket'
import Historial from './pages/Historial'
import Alimentos from './pages/Alimentos'
import Tickets from './pages/Tickets'
import AtenderMesa from './pages/AtenderMesa'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro/" element={<Registro />} />
        <Route path="/menu-admin/" element={<MenuAdmin />} />
        <Route path="/menu-cliente/" element={<MenuCliente />} />
        <Route path="/agregar-ticket/" element={<AgregarTicket />} />
        <Route path="/historial/" element={<Historial />} />
        <Route path="/alimentos/" element={<Alimentos />} />
        <Route path="/tickets/" element={<Tickets />} />
        <Route path="/atender-mesa/" element={<AtenderMesa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App