import solicitudModel, { solicitudModelI } from '../../models/solicitudModel';
import {guardarSolicitudEstado} from '../solicitud_estado/solicitudEstadoClass'



/* Metodo crear solicitud */
export const guardarSolicitud = async (solicitud:{}) => {
    try {
      
        const nuevoSolicitud = new solicitudModel({... solicitud});
        const registroSolicitud:solicitudModelI = await nuevoSolicitud.save() as solicitudModelI;

        if(registroSolicitud) {

            const nuevaSolicitudEstado = {
                idSolicitud:registroSolicitud._id
            }

            const solicituEstadoCreada = await guardarSolicitudEstado(nuevaSolicitudEstado);
            if(!solicituEstadoCreada) console.log('Error al guardar solicitud estado');            
            return registroSolicitud;
        } 

    } catch (error) {
        console.error('Ocurrio un error en el metodo guardarSolicitud: ', error);
        return;        
    }
};

// Modifica el estado final de la solicitud que es true
export const modificaEstadoFinalSolicitud = async (_id:string)=> {
    try {
        const modificaSolicitud = await solicitudModel.findByIdAndUpdate(_id, {contratado: true}, { new: true }) as solicitudModelI;
          if(modificaSolicitud) return true;
    } catch (error) {
        console.error('Ocurrio un error en el metodo guardarSolicitud: ', error);
        return false;        
    }
};

// Metodo que valida si existe la solicitud
export const validoExisteSolicitud = async (_id:string)=> {
    try {
        const existeSolicitud = await solicitudModel.findById(_id) as solicitudModelI;
          if(existeSolicitud) return existeSolicitud;
    } catch (error) {
        console.error('Ocurrio un error en el metodo validoExisteSolicitud: ', error);
        return;        
    }
};

export const getSolicitudIdPersona = async (idpersona:string)=> {
    try {
        const getIdPersonaSolicitud = await solicitudModel.findOne({idpersona:idpersona}) as solicitudModelI;
          if(getIdPersonaSolicitud) return getIdPersonaSolicitud;
    } catch (error) {
        console.error('Ocurrio un error en el metodo validoExisteSolicitud: ', error);
        return;        
    }
};