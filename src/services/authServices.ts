import jwt from 'jsonwebtoken';
import moment from 'moment';
import keys from '../keys';
import {Ipayload} from '../interfaces/authInterfaces';
import { dameUsuario } from '../logic/usuario/usuarioClass';
import { usuarioModelI } from '../models/userModel';

export const crearToken = async (id: string): Promise<string> => {
    const payload = {
        sub: id,
        iat: moment().unix(),
        exp: moment().add(30, 'm').unix()
    };
    const token = await jwt.sign(payload, keys.SECRET_TOKEN);
    return token;
};

export const decodeToken =  async (token: string): Promise<string> => {
    try {
        const payload:Ipayload = jwt.decode(token) as Ipayload;        
        const tokenUserExiste: usuarioModelI = await dameUsuario(payload.sub, 'id') as usuarioModelI;

        if (!tokenUserExiste) return 'Invalido';        
        if (payload.exp <= moment().unix()) return 'Expirado';
       
        return tokenUserExiste._id;

    } catch (error) {
        console.error('Ocurrio un error en el metodo decodeToken',error);
        return 'Error';
    }
};