import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav className="flex justify-end bg-black">
        <Link 
          className='text-teal-400 text-center m-5 text-emerald-950 uppercase text-sm'
          to="/signup"
        >Sign Up</Link>

        <Link 
          className='text-teal-400 text-center m-5 text-emerald-950 uppercase text-sm'
          to="/reset-password"
        >Login</Link>
      </nav>  
    </header>
  )
}

export default Header