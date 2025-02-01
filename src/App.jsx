import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Auth from './pages/Auth'
import Flower from './pages/Flower'

function App() {
  const location = useLocation()

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Auth />} />
      <Route path="/flower" element={<Flower />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
