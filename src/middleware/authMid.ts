import {decodeToken} from '../services/authServices';
import {Response,Request, NextFunction} from 'express';

export const isAuth = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const {authorization} = req.headers
        if (!authorization) return res.status(400).send({ msg: 'Autorización no enviada' });     

        const token = authorization.split(' ')[1];    
        const resultadoAtenticacion =  await decodeToken(token);  
        
        if(resultadoAtenticacion === 'Expirado') return res.header({sesion: false}).status(400).send({msg: 'Token a expirado'});
        if(resultadoAtenticacion === 'Invalido') return res.header({sesion: false}).status(400).send({msg: 'Token Invalido'}); 
        if(resultadoAtenticacion === 'Error') return res.header({sesion: false}).status(400).send({msg: 'Problemas con el token'});        
        res.header('sesion','true');        
        next();   

    }catch(error){
        console.error('Ocurrio un error en el middleware isAuth:', error);
        res.status(500).send({msg:'Error en Token'});        
    }
}