import {Schema, model, Document} from 'mongoose';

const fileSchema = new Schema({
    idOrigen: {type: Schema.Types.ObjectId},
    tipo: { type: String, required: true },
    origen: {type: String, required: true},
    titulo: {type: String},
    filename: { type: String, required: true },
    descripcion: {type: String},
    imagenpath: {type: String, required: true}   
},
{
    timestamps: true
});

export interface fileModelI extends Document{
    idPersona: string;
    tipo: string;
    origen: string;
    titulo?: string;
    filename: string;
    descripcion?: string;
    imagenpath: string;   
}

export default model<fileModelI>('fileModel', fileSchema);