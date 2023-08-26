import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendNewUser } from '../../server/api/user/post'

import Alert from '../../components/Alert'


const Signup = () => {

    
    const [ newUser, setNewUser] = useState( {
        userName: '',
        email: '',
        password: '',
        password2:''
    })
    const [alert, setAlert] = useState({})

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
                msg: 'All fields is mandatory',
                error: true
            });
            return
        }

        if(password !== password2 ) {
            setAlert({
                msg: 'Password is not same',
                error: true
            })
            return
        }

        if(password.length < 6 ) {
            setAlert({
                msg: 'Password min 6 characteres',
                error: true
            })
            return
        }

        setAlert({})

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
            <h1 className="text-teal-600 font-black text-4xl capitalize">signup 
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
                        htmlFor="username"
                    >Username</label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        placeholder="Username"
                        className="w-full mt-3 p-3 border  bg-gray-50"
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
                        placeholder="Email"
                        className="w-full mt-3 p-3 border  bg-gray-50"
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
                        placeholder="Password"
                        className="w-full mt-3 p-3 border  bg-gray-50"
                        value={newUser.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password2"
                    >Password, again</label>
                    <input
                        id="password2"
                        name="password2"
                        type="password"
                        placeholder="Password Two"
                        className="w-full mt-3 p-3 border  bg-gray-50"
                        value={newUser.password2}
                        onChange={handleChange}
                    />
                </div>

                <input 
                    type="submit"
                    value="Create Account"
                    className="bg-teal-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-teal-800 transition-colors"
                />
                
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link 
                    className='block text-center my-5 text-emerald-950 uppercase text-sm'
                    to="/"
                >Login</Link>

                <Link 
                    className='block text-center my-5 text-emerald-950 uppercase text-sm'
                    to="/reset-password"
                >Forgot your Password?</Link>
            </nav>
        
        </>
    )
}

export default Signup