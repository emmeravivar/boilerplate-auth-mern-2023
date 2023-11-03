import mongoose from "mongoose";


//Diseñamos nuestro Schema
const artistSchema = mongoose.Schema(
    {
        artistName: {
            type: String,
            required: true,
            trim: true,
        },
        artistType: {
            type: String,
            required: true,
            trim: true,
        },
        artistGener: {
            type: String,
            required: true,
            trim: true,
        },
        artistCountry: {
            type: String,
            required: true,
            trim: true,
        },
        artistWeb: {
            type: String,
        },
        artistBorn: {
            type: String,
        },
        artistPictures: {
            type: Array,
        },
        artistPicture: {
            type: String,
        },
        artistRRSS: {
            type: Array,
        },
        artistProjects: {
            type: Array,
        },
        artistWorks: {
            type: Array,
        },
        artistCollaborations: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);


//Esto hace que se ejecute antes de guardar el registro en la BBDD
artistSchema.pre('save', async function(next) {

    //Esta función regisa que el pass de aquí no ha cambiado,
    //ya que si no se hace y se envia una actualización del user
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


//Definir el schema
const Artist = mongoose.model("artist", artistSchema)

export default Artist;