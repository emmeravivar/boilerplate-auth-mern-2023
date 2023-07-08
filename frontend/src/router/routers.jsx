import { createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider.jsx'
import AuthLayout from './../layouts/AuthLayout.jsx'
import Login from '../paginas/auth/Login'
import Registrar from '../paginas/auth/Registrar'
import OlvidarPassword from '../paginas/auth/OlvidarPassword'
import NuevoPassword from '../paginas/auth/NuevoPassword'
import ConfirmarCuenta from '../paginas/auth/ConfirmarCuenta.jsx'
import RutaProtegida from '../layouts/RutaProtegida.jsx'
import Proyectos from '../paginas/proyectos/Proyectos.jsx'


const Routers = createBrowserRouter([
    {
        path: "/",
        element:<AuthProvider>
                    <AuthLayout />
                </AuthProvider>,
        children: [
        {
            path: '/',
            element: <Login />,
        },
        {
            path: '/registrar',
            element: <Registrar />,
        },
        {
            path: '/olvide-password',
            element: <OlvidarPassword />,
        },
        {
            path: '/resetear-password/:token',
            element: <NuevoPassword />,
        },
        {
            path: '/confirmar/:token',
            element: <ConfirmarCuenta />,
        },
        ],
    },
    {
        path: "/proyectos",
        element: <AuthProvider>
                    <RutaProtegida />
                </AuthProvider>,
        children: [
                {
                    path: "/proyectos",
                    element: <Proyectos />
                }
        ]
    },

]);

export default Routers;