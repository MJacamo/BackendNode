import solicitudEstadoModel, {solicitudEstadoModelI} from '../../models/solicitudEstadoModel';
import {modificaEstadoFinalSolicitud} from '../solicitud/solicitudClass'
import {validoExisteSolicitud} from '../../logic/solicitud/solicitudClass'


export const guardarSolicitudEstado = async (solicitudEstado:{}) => {
    try {
        const nuevoSolicitudEstado = new solicitudEstadoModel({... solicitudEstado});
        const registroSolicitudEstado = await nuevoSolicitudEstado.save() ;
        if(registroSolicitudEstado) return registroSolicitudEstado;
    } catch (error) {
        console.error('Ocurrio un error en el metodo guardarSolicitudEstado: ', error);
        return;        
    }
};

export const modificaSolicitudEstado = async (idSolicitud:string, estado:string) => {
    try {
        
        const existeSolicitud = await validoExisteSolicitud(idSolicitud);        
        const existeSolicitudEstado = await validoExisteSolicitudEstado(existeSolicitud!._id);                        

        if(existeSolicitudEstado && existeSolicitud!.contratado === false) {            
            
            if(existeSolicitudEstado!.estadoActual === 'lead' && estado === 'applicant' ) { 

                const modificacionSolicitudEstado = await modifico(existeSolicitudEstado._id, estado);
                console.log('modificacionSolicitudEstado', modificacionSolicitudEstado);
                if (modificacionSolicitudEstado) return modificacionSolicitudEstado;

            }else if (existeSolicitudEstado!.estadoActual === 'applicant' && estado === 'candidate' ) {

                const modificacionSolicitudEstado = await modifico(existeSolicitudEstado._id, estado);
                if (modificacionSolicitudEstado) return modificacionSolicitudEstado;

            }else if (existeSolicitudEstado!.estadoActual === 'candidate' && estado === 'employee' ) {

                const modificacionSolicitudEstado = await modifico(existeSolicitudEstado._id, estado);
                if(modificacionSolicitudEstado) return modificacionSolicitudEstado;

            }else if (existeSolicitudEstado!.estadoActual === 'employee' && estado === 'contract' ) {

                const modificacionSolicitudEstado = await modifico(existeSolicitudEstado._id, estado);                
                const okmodificado = await modificaEstadoFinalSolicitud(idSolicitud);
                okmodificado? console.log('Modificado estado final'): console.log('Error al modificar estado final');
                if(modificacionSolicitudEstado) return modificacionSolicitudEstado;

            } 
        }
        
    } catch (error) {
        console.error('Ocurrio un error en el metodo modificaSolicitudEstado: ', error);
        return;        
    }
};


const modifico = async (id:string, estado:string) => {
    try {
        const modificacionSolicitudEstado = await solicitudEstadoModel.findByIdAndUpdate({_id:id},{estadoActual:estado}, {new:true});        
        if(modificacionSolicitudEstado) return modificacionSolicitudEstado;
    } catch (error) {
        console.error('Error al guardar estado',error);
        
    }

}


const validoExisteSolicitudEstado = async (_id:string) => {
    try {
        const existeSolicitudEstado = await solicitudEstadoModel.findOne({idSolicitud:_id}) as solicitudEstadoModelI;
          if(existeSolicitudEstado) return existeSolicitudEstado;
    } catch (error) {
        console.error('Ocurrio un error en el metodo validoExisteSolicitudEstado: ', error);
        return;        
    }
}





