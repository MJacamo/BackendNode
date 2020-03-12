import {Schema, model, Document} from 'mongoose';

const  solicitudEstadoSchema = new Schema({
    idSolicitud: {type: Schema.Types.ObjectId},
    estadoActual: { type: String, default:'lead' }    
},
{
    timestamps:true
})


export interface solicitudEstadoModelI extends Document{   
    idSolicitud: string;
    estadoActual?: string;  
}

export default model<solicitudEstadoModelI>('solicitudEstadoModel', solicitudEstadoSchema);