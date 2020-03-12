import Usuarios, {usuarioModelI} from '../../models/userModel';
import {IUsuarioAuth} from '../../interfaces/authInterfaces';
import {crearToken} from '../../services/authServices';

/* Validar si el usuario ya exite retorna una promesa boolean */
export const validarEmailUsuario = async (email: string): Promise<boolean> => {
    try {
        const user:usuarioModelI | null = await Usuarios.findOne({email:email});
        if (user) return true;
        return false;
    } catch (error) {
        console.error('Ocurrio un error en el metodo validarEmailUsuario:', error);
        return false;
    }
};

/* Validar si el usuario ya exite retorna una promesa boolean */
export const usuarioActivo = async (email: string): Promise<boolean> => {
    try {
        const user:usuarioModelI | null = await Usuarios.findOne({email:email}).where('actived').equals(true);
        if (user) return true;
        return false;
    } catch (error) {
        console.error('Ocurrio un error en el metodo usuarioActivo:', error);
        return false;
    }
};

/* Registrar retorna una promesa de tipo usuario IusarioModel */
export const registrarUsuario = async (usuario: IUsuarioAuth): Promise<usuarioModelI | undefined> => {
    try { 
               
        const nuevoUsuarioRegistrado:usuarioModelI = new Usuarios({... usuario});
        nuevoUsuarioRegistrado.password = await nuevoUsuarioRegistrado.encrypPassword(nuevoUsuarioRegistrado.password);      
        const usuarioRegistrado = await nuevoUsuarioRegistrado.save();
        return usuarioRegistrado;    

    } catch (error) {
        console.error('Ocurrio un error en el metodo registrarUsuario:', error);        
    }
};

export const loginUsuario = async (usuario: IUsuarioAuth): Promise<usuarioModelI | null> => {
    try {
        const usuarioValida = await Usuarios.findOne({email:usuario.email});
        if(!usuarioValida) return null; 

        const validaUsuario = await usuarioValida.validatePassword(usuario.password)
        if(!validaUsuario) return null;
        
        return usuarioValida;

    } catch (error) {
        console.error('Ocurrio un error en el metodo registrarUsuario:', error);
        return null;
    }
};

export const dameToken = async (id: string): Promise<string| null> => {
    try {
        const recuperoToken:string = await crearToken(id) as string;
        if(recuperoToken) return recuperoToken;
        return null;
    } catch (error) {
        console.error('Ocurrio un error en el metodo dameToken:', error);
        return null;        
    }
};

