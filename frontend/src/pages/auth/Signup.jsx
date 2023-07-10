import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../../components/Alert'
import { sendNewUser } from './../../server/api/user/post'


const Signup = () => {

    const [ newUser, setNewUser] = useState( {
        userName: '',
        email: '',
        password: '',
        password2:''
    })
    const [ alert, setAlert ] = useState({})




    const handleChange = e => {

        const { name, value } = e.target
        const newUserData = {...newUser, [name]:value}
        setNewUser(newUserData)

    }

    const handleSubmit = async e => {
        e.preventDefault();
        const { userName, email, password, password2 } = newUser

        if([userName, email, password, password2].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        if(password !== password2 ) {
            setAlert({
                msg: 'Los password no son iguales',
                error: true
            })
            return
        }

        if(password.length < 6 ) {
            setAlert({
                msg: 'El Password es muy corto, agrega mínimo 6 caracteres',
                error: true
            })
            return
        }

        setAlert({})


        // Crear el usuario en la API
        try {
            const { data } = await sendNewUser(newUser)
            setAlert({
                msg: data.msg,
                error: false
            })

            setNewUser( {
                userName: '',
                email: '',
                password: '',
                password2:''
            })

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
            <h1 className="text-sky-600 font-black text-3xl capitalize text-center">Crea tu Cuenta y Administra tus {''}
                <span className="text-slate-700">proyectos</span>
            </h1>

            { msg && <Alert alerta={alert} /> }
        
            <form 
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={ handleSubmit }
            >
                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="nombre"
                    >Nombre</label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        placeholder="Tu Nombre"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={ newUser.userName }
                        onChange={ handleChange }
                    />
                </div>

                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={ newUser.email }
                        onChange={ handleChange }
                    />
                </div>
                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                    >Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={newUser.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password2"
                    >Repetir Password</label>
                    <input
                        id="password2"
                        name="password2"
                        type="password"
                        placeholder="Repetir tu Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={newUser.password2}
                        onChange={handleChange}
                    />
                </div>

                <input 
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
                
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link 
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/"
                >¿Ya tienes una cuenta? Inicia Sesión</Link>

                <Link 
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/olvide-password"
                >Olvide Mi Password</Link>
            </nav>
        
        </>
  )
}

export default Signup