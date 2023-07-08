import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth.jsx'


const RutaProtegida = () => {
  
  const { auth, loading } = useAuth()
  
  if(loading) return 'Cargando...'

  return (
    <div>
      { auth._id ? <Outlet /> : <Navigate to='/' /> }
    </div>
  )
}

export default RutaProtegida