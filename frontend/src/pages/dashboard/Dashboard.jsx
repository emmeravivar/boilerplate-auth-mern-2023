import useAuth from "../../hooks/useAuth"

const Dashboard = () => {

  const {closeSesion} = useAuth()

  const handleCloseSesion = () => {
    closeSesion()
  }

  return (
    <div className="container mx-auto">
      <h1 className="sfont-black text-4xl capitalize">
          <span className="text-emerald-900">Dashboard</span>
      </h1>
      <button  className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded" onClick={handleCloseSesion}>
        Logout
      </button>


    </div>
  )
}

export default Dashboard