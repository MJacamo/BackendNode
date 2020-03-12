import peronaModel, {personaModelI} from '../../models/personaModel';


export const verificaPersona = async (CodigoSocialPersona: string, variable:string) => {
    try {
        if (CodigoSocialPersona && variable === 'codigo' ){
            const existePersona = await peronaModel.findOne({idSeguro:CodigoSocialPersona});
            if (!existePersona) return null;
            return existePersona;
        }else{
            const existePersona = await peronaModel.findById(CodigoSocialPersona);
            if (!existePersona) return null;
            return existePersona;
        }
        
    } catch (error) {
        console.error('Ocurrio un error en el metodo verificaPersona:', error);
    }
}

/* Metodo para guardar persona */
export const guardarPersona = (persona:{})=> {
    try {
        const nuevoPersona = new peronaModel({... persona});
        const registroPersona = nuevoPersona.save() ;
        if(registroPersona) return registroPersona;
    } catch (error) {
        console.error('Ocurrio un error en el metodo guardarPersona: ', error);
        return;        
    }
};


export const getPersona = (idPersona: string)=>{
    try {
        if (idPersona){
            const obtengoPersona = peronaModel.findById(idPersona);
            if (!obtengoPersona) return null;
            return obtengoPersona;
        }
    } catch (error) {
        console.error('Ocurrio un error en el metodo getPersona:', error);
    }
}