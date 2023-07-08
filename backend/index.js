//Configuración del servidor
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectBD } from "./config/connectDb.js"
import usuariosRoutes from "./routes/Usuarios.routes.js"
import proyectosRoutes from "./routes/Proyectos.routes.js"
import tareasRoutes from "./routes/Tareas.routes.js"


const app = express()
//configurando leer JSON
app.use(express.json())

const port = process.env.PORT || 4000



//Configurando dorenv
dotenv.config(); // busca un archivo .env

//Conectando nuestra BBDD
connectBD()

//Configurar CORS
    //WhiteList
    const whitelist = [process.env.FRONT_END_URL, process.env.FRONT_END_URL_LOCALHOST]
    console.log(whitelist)
    const corsOptions = {
        origin: (origin, callback) => {
            console.log(origin)
            if (whitelist.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
app.use(cors(corsOptions))

//Routing
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/proyectos", proyectosRoutes)
app.use("/api/tareas", tareasRoutes)


app.listen(port, () => {
    console.log('servidor corriendo en el puerto 4000')
})