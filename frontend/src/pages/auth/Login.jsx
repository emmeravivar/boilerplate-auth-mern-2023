import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendLogin } from '../../server/api/user/post'
import useAuth from '../../hooks/useAuth.jsx';
import Alert from '../../components/Alert'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();  
        if([email, password].includes('')) {
            setAlert({
                msg: 'All fields is mandatory',
                error: true
            });
            return
        }

        try {
            const { data } = await sendLogin({ email, password})
            setAlert({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            console.log(data)
            navigate('/dashboard')
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alert

    return (
        <>
            <h1 className="text-teal-600 font-black text-4xl capitalize">Login 
                <span className="text-emerald-900">User</span>
            </h1>

            {msg && <Alert alert={alert} />}
        
            <form 
                className="my-10 bg-white shadow  p-10"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >Username</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="username(email)"
                        className="w-full mt-3 p-3 border  bg-gray-50"
                        value={ email }
                        onChange={ e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                    >Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full mt-3 p-3 border  bg-gray-50"
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value="Login"
                    className="bg-teal-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-teal-800 transition-colors"
                />
                
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link 
                    className='block text-center my-5 text-emerald-950 uppercase text-sm'
                    to="/signup"
                >Sign Up</Link>

                <Link 
                    className='block text-center my-5 text-emerald-950 uppercase text-sm'
                    to="/reset-password"
                >Forgot your Password?</Link>
            </nav>
        
        </>
  )
}

export default Login