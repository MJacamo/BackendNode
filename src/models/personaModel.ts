import {Schema, model, Document} from 'mongoose';

const  personaSchema = new Schema({
    nombre: {type: String, required: true, uppercase: true},
    apellido: {type: String, uppercase: true},
    correo: {type: String, required: true},
    celular: {type: String},
    idSeguro: { type: String, unique: true, max: 9}    
},
{
    timestamps:true
})


export interface personaModelI extends Document{
    _id: string;
    nombre: string;
    apellido: string;
    correo: string;
    celular: string;
    idSeguro: string;}

export default model<personaModelI>('peronaModel', personaSchema);