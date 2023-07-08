import mongoose from "mongoose";

//Diseñamos nuestro Schema
const proyectoSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        descripion: {
            type: String,
            required: true,
            trim: true,
        },
        fecha: {
            type: Date,
            default: Date.now()
        },
        cliente: {
            type: String,
            required: true,
            trim: true,
        },
        creador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        colaboradores: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        }]
    },
    {
        timestamps: true,
    }
);




//Definir el schema
const Proyecto = mongoose.model("Proyecto",proyectoSchema)

export default Proyecto;