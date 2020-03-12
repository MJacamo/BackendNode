import {Request, Response} from 'express';
import {modificaSolicitudEstado} from '../logic/solicitud_estado/solicitudEstadoClass';

export async function cambioEstadoSolicitud ( req: Request, res: Response):Promise<Response> {
    try {

        const {id} = req.params;
        const { estado } = req.body;

        if( id && estado==='applicant' ) {            

            const cambioSolicitudEstado = await modificaSolicitudEstado(id,estado);
            if (!cambioSolicitudEstado) return res.status(400).send({msg: 'Verifique el estado que desea actualizar'})
            
           return res.status(200).send({
                msg: 'Estado modificado con exito',
                cambioSolicitudEstado
            })            
        }else if( id && estado==='employee' ) {

            const cambioSolicitudEstado = await modificaSolicitudEstado(id,estado);
            if (!cambioSolicitudEstado) return res.status(400).send({msg: 'Verifique el estado que desea actualizar'})
            
           return res.status(200).send({
                msg: 'Estado modificado con exito',
                cambioSolicitudEstado
            })
        } else if( id && estado==='contract' ){

            const cambioSolicitudEstado = await modificaSolicitudEstado(id,estado);
            if (!cambioSolicitudEstado) return res.status(400).send({msg: 'Verifique el estado que desea actualizar'})
            
           return res.status(200).send({
                msg: 'Estado modificado con exito',
                cambioSolicitudEstado
            })
        } else{
            return res.status(400).send({msg: 'Estado no valido'})
        }       
        
    } catch (error) {
        return res.status(500).send({msg: 'Ocurrio un error al cambiar estado', error});
    }
}
