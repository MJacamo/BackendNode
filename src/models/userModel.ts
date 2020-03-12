import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

const  usuarioSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    actived: { type: Boolean, default: true }    
},
{
    timestamps:true
})


export interface usuarioModelI extends Document{
    email: string;
    password: string;
    actived: boolean;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

usuarioSchema.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    return bcrypt.hash(password, salt);
};

usuarioSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<usuarioModelI>('usuarioModel', usuarioSchema);