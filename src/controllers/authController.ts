/* Propiedades de express */
import {Request ,Response } from 'express';

/* Logica de negocio */
import {validarEmailUsuario, registrarUsuario, dameToken,loginUsuario, usuarioActivo} from '../logic/auth/authClass';
import {dameUsuario} from '../logic/usuario/usuarioClass';


/* Interfaces */
import {usuarioModelI} from '../models/userModel';
import {IUsuarioAuth } from '../interfaces/authInterfaces';
import {generate} from '../services/codigServices';


export async function registrar ( req: Request, res: Response): Promise<Response> {
    try {

        const usurioRegistro:IUsuarioAuth = req.body;
        
        /* Verifico que no exista */
        const validaUsuario = await validarEmailUsuario(usurioRegistro.email);        
        if(validaUsuario) return res.status(400).send({msg: 'Usuario ya existe.',code:11000});
        
        /* Registro el usuario */
        const usuario = await registrarUsuario(usurioRegistro);
        if (!usuario) return res.status(400).send({msg: 'Usuario no registrado'});
            
        return res.status(200).send({msg: 'Usuario registrado', user:{_id:usuario._id}});        

    } catch (error) {
        return res.status(500).send({msg: 'Ocurrio un error al registrar', error});
    }
}

export async function login ( req: Request, res: Response): Promise<Response> {
    try {
        const usurioLogueado:IUsuarioAuth = req.body;

        /* Verifico que no exista */
        const validaUsuario = await validarEmailUsuario(usurioLogueado.email);    
        if(!validaUsuario) return res.header({user: false}).status(400).send({msg: 'Usuario no existe en db.', clave:'email'});


        const activoUsuario = await usuarioActivo(usurioLogueado.email);    
        if(!activoUsuario) return res.header({user: false}).status(400).send({msg: 'La cuenta requiere activación.', clave:'activo'});
        
        /* Validar la contraseña */
        const passwordValido = await loginUsuario(usurioLogueado);
        if(!passwordValido) return res.status(400).send({msg: 'Password no valido.', clave: 'pass'});

        /* Regresar Token */
        const token = await dameToken(passwordValido.id);
        
        /* const valido = await Usuarios. */
        return res.status(200).send({message: 'Usario logueado', token,user:passwordValido})
    } catch (error) {
        console.error(error);        
        return res.status(500).send({msg: 'Ocurrio un error al loguear', error});
    }
}



