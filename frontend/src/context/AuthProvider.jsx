import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../server/api/user/get';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    
    const [auth, setAuth] = useState({})
    const [loading, setLoading ] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {

        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token){
                setLoading(false) 
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            try {
                const { data } = await getUserProfile(config)
                setAuth(data)
                navigate('/proyectos')
            }
            catch(error) {
                setAuth({})
            }

            setLoading(false)
        }
        autenticarUsuario()


    },[])

    return(
        <AuthContext.Provider
            value = {{                
                    setAuth, 
                    auth, 
                    loading
                }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider}

export default AuthContext;