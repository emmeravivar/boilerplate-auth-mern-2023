import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth.jsx'


const AccessToDashboard = () => {
  
  const { auth,loading } = useAuth()
  
  if( loading ) return 'Loading...'

  return (
    <div>
      {auth._id ? <Outlet /> : <Navigate to='/' /> }
    </div>
  )
}

export default AccessToDashboard