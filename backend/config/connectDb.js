import mongoose from "mongoose"


//Conectar nuestra BBDD
export const connectBD = async () => {
    try {
		const connection = await mongoose.connect(process.env.MONGO_URI, 
			{
				useNewUrlParser: true,
				useUnifiedTopology:true
			});
            const url = `${connection.connection.host}:${connection.connection.port}`
            console.log(`MongoDB conecta en: ${url}`)
		}
    catch (error) {
        console.log(`error: ${error.message}`)
		process.exit(1) // normalmente node acaba los procesos con 0.Forzar proceso termine
    }
}