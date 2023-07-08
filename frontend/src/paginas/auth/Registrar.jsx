import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../../components/Alerta'
import { saveNewUser } from '../../server/api/user/post'


const Registrar = () => {

    const [ nuevoUsuario, setNuevoUsuario] = useState( {
        nombre: '',
        email: '',
        password: '',
        password2:''
    })
    const [ alerta, setAlerta ] = useState({})




    const handleChange = e => {

        const { name, value } = e.target
        const nuevoUsuarioData = {...nuevoUsuario, [name]:value}
        setNuevoUsuario(nuevoUsuarioData)

    }

    const handleSubmit = async e => {
        e.preventDefault();
        const { nombre, email, password, password2 } = nuevoUsuario

        if([nombre, email, password, password2].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        console.log(password, password2)

        if(password !== password2 ) {
            setAlerta({
                msg: 'Los password no son iguales',
                error: true
            })
            return
        }

        if(password.length < 6 ) {
            setAlerta({
                msg: 'El Password es muy corto, agrega mínimo 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})


        // Crear el usuario en la API
        try {

            const { data } = await saveNewUser(nuevoUsuario)
            
            //Todo abrir una modal o otra página
            setAlerta({
                msg: data.msg,
                error: false
            })

            setNuevoUsuario( {
                nombre: '',
                email: '',
                password: '',
                password2:''
            })

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
        <>
            <h1 className="text-sky-600 font-black text-3xl capitalize text-center">Crea tu Cuenta y Administra tus {''}
                <span className="text-slate-700">proyectos</span>
            </h1>

            { msg && <Alerta alerta={alerta} /> }
        
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
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Tu Nombre"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={ nuevoUsuario.nombre }
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
                        value={ nuevoUsuario.email }
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
                        value={nuevoUsuario.password}
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
                        value={nuevoUsuario.password2}
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

export default Registrar