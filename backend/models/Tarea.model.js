import mongoose from "mongoose";

//Diseñamos nuestro Schema
const tareaSchema = mongoose.Schema(
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
        estado: {
            type: Boolean,
            default: false
        },
        fechaEntrega: {
            type: Date,
            default: Date.now(),
            required: true
        },
        prioridad: {
            type: String,
            required: true,
            enum: ["Baja", "Media", "Alta"]
        },
        proyecto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Proyecto'
        }
    },
    {
        timestamps: true,
    }
);




//Definir el schema
const Tarea = mongoose.model("Tarea", tareaSchema)

export default Tarea;