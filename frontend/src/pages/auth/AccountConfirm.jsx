import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {confirmNewUser } from '../../server/api/user/get.jsx'
import Alert from '../../components/Alert'


const AccountConfirm= () => {

  const [alert, setAlert] = useState({})
  const [confirmAccount, setConfirmAccount] = useState(false)

  const params = useParams();
  const { token } = params


  useEffect(() => {
    const confirmAccount = async () => {
      try {
          const { data } = await confirmNewUser(token)

          setAlert({
            msg: data.msg,
            error: false
          })
          setConfirmAccount(true)

      } catch (error) {
          setAlert({
            msg: error.response.data.msg,
            error: true
          })
      }
    }
    confirmAccount();
  }, [])

  const { msg } = alert


  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma tu cuenta y Comienza a crear tus {''}
            <span className="text-slate-700">Dashboard</span>
        </h1>

        <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {msg && <Alert alert={alert} />}

          {confirmAccount && (
            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm'
                to="/"
            >Inicia Sesión</Link>
          )}
        </div>
    </>
  )
}

export default AccountConfirm