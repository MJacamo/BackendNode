import {Schema, model, Document} from 'mongoose';

const solicitudSchema = new Schema({
    idpersona: {type: Schema.Types.ObjectId},
    plaza: {type: String, required: true, trim: true},
    contratado: {type: Boolean, default: false}
},
{
    timestamps: true
})

export interface solicitudModelI extends Document{
    _id: string;
    idpersona: string;
    plaza: string;
    contratado: boolean;
}


export default model<solicitudModelI>('SolicitudModel', solicitudSchema);
