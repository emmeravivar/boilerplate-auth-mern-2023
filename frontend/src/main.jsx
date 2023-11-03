import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Routers  from './router/routers.jsx'


import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(

                <RouterProvider router={ Routers } />

)
