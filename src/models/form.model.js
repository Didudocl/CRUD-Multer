//importa el modulo 'mongoose' para crear el modelo
import {Schema, model} from 'mongoose';

//crea el esquema de la coleccion
const formSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    archivo: {
        type: String,
        required: true,
    }
});

export default model('Form', formSchema);