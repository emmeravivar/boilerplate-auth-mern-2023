import mongoose from "mongoose";
import bcrypt from "bcrypt";

//Diseñamos nuestro Schema
const usuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        token: {
            type: String,
        },
        confirmado: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


//Esto hace que se ejecute antes de guardar el registro en la BBDD
usuarioSchema.pre('save', async function(next) {

    //Esta función regisa que el pass de aquí no ha cambiado,
    //ya que si no se hace y se envia una actualización del usuario
    // volverá a hashear y ya no podrán acceder.
    if(!this.isModified('password')) {
        next() // next iría a la siguiente paso
        //return: detendría la ejecución
    }

    //Creamos cadena salt
    const salt = await bcrypt.genSalt(10);

    // la función hash nos hace que el salt lo una con el password y lo guarda
    this.password = await bcrypt.hash(this.password, salt)

})

//Metodo para comprobar el password
usuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {

    //retornará true o false con el metodo compare
    return await bcrypt.compare(passwordFormulario, this.password)

}


//Definir el schema
const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario;