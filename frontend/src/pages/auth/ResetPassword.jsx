import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendResetPassword } from '../../server/api/user/post'
import Alert from '../../components/Alert'

const ResetPassword = () => {

    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if(email === '' || email.length < 6) {
            setAlert({
                msg: 'Please, field is mandatory',
                error: true
            });
            return
        }

        try {
            const { data } = await sendResetPassword({ email })
            console.log(data)

            setAlert({
                msg: data.msg,
                error: false
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
            <h1 className="text-teal-600 font-black text-4xl capitalize">ResetPassword
                <span className="text-emerald-900">User</span>
            </h1>

            { msg && <Alert alert={alert} />}

            <form 
                className="my-10 bg-white shadow  p-10"
                onSubmit={handleSubmit}
            >
        

                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border  bg-gray-50"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                </div>
                

                <input 
                    type="submit"
                    value="Send the email"
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
                    to="/signup"
                >Signup</Link>
            </nav>

        </>
    )
}

export default ResetPassword