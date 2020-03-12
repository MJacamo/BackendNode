import usuarioModel, { usuarioModelI } from '../../models/userModel';

export const dameUsuario = async (valor: string, criterio: string): Promise<usuarioModelI | undefined> =>{
    try {
        if (criterio === 'id'){
            const obtenerusuarioModelXId:usuarioModelI = await usuarioModel.findById(valor,{password:0, __v:0}) as usuarioModelI;
            return obtenerusuarioModelXId;
        }else if (criterio === 'email'){
            const obtenerusuarioModelXEmail:usuarioModelI = await usuarioModel.findOne({email:valor}, {password:0,  __v:0}) as usuarioModelI;
            return obtenerusuarioModelXEmail;
        }
    } catch (error) {
        console.error('Ocurrio un error en el metodo obtenerusuarioModel:', error);
        return;        
    }
}


export const dameUsuarios = async (): Promise<usuarioModelI[] | undefined> =>{
    try { 
        
        const filtro = { "actived": false, "role": { $all: [1] }};
        
        const obtenerusuarioModels:usuarioModelI[] = await usuarioModel.find({},{__v:0,createdAt:0, updatedAt:0, password:0}) as usuarioModelI[];
        return obtenerusuarioModels;      
 
    } catch (error) {
        console.error('Ocurrio un error en el metodo dameusuarioModels:', error);
        return;        
    }
}

