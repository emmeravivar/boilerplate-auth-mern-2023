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
        <h1 className="text-teal-600 font-black text-4xl capitalize">ConfirmYour
            <span className="text-emerald-900">Account</span>
        </h1>

        <div className='mt-20 md:mt-10 shadow-lg px-5 py-10  bg-white'>
          {msg && <Alert alert={alert} />}

          {confirmAccount && (
            <Link 
                className='block text-center my-5 text-emerald-950 uppercase text-sm'
                to="/"
            >Login</Link>
          )}
        </div>
    </>
  )
}

export default AccountConfirm