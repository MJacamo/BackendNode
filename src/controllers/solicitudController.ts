import {Request, Response} from 'express';
import {guardarSolicitud,modificaEstadoFinalSolicitud, validoExisteSolicitud} from '../logic/solicitud/solicitudClass';
import { verificaPersona } from '../logic/persona/personaClass';


export async function crearSolicitud ( req: Request, res: Response):Promise<Response> {
    try {

        // obtenemos el id del persona solicitante para validar si existe
        const solicitud = req.body;
        
        //Validamos que la persona exista
        const existePresona = await verificaPersona(solicitud.id,'id');
        if(!existePresona) return res.status(400).send({
            msg: 'No se puede asociar solicitud a esta persona ya que no esta registrada'
        }) 
        
        //Validamos que obtenemos los campos requeridos
        if(!solicitud.plaza && !solicitud.idpersona ) return res.status(400).send({
            msg: 'Faltan campos requeridos'
        });
        
        //Registramos la solicitud
        const solicitudCreada = await guardarSolicitud(solicitud);
        if(!solicitudCreada) return res.status(400).send({
            msg: 'Problemas al crear solicitud'
        });
        
        return res.status(200).send({
            msg: 'Solicitud registrada con exito',
            solicitudCreada
        })
    } catch (error) {
        return res.status(500).send({msg: 'Ocurrio un error al crear la solicitud', error});
    }
}

export async function modificarSolicitud ( req: Request, res: Response):Promise<Response> {
    try {

        // obtenemos el id de la solicitud para validar si existe
        const {id} = req.params;
        const solicitud = req.body;
        
        //Validamos que la persona exista
        const existeSolicitud = await validoExisteSolicitud(id);
        if(!existeSolicitud) return res.status(400).send({
            msg: 'La solicitud que intenta modificar no existe'
        }) 
        
        //Validamos que obtenemos los campos requeridos
        if(!solicitud.plaza ) return res.status(400).send({
            msg: 'Faltan campos requeridos'
        });
        
        //Modificamos la solicitud
        const solicitudModificada = await modificaEstadoFinalSolicitud(id);
        if(!solicitudModificada) return res.status(400).send({
            msg: 'Problemas al modificar la solicitud'
        });
        
        return res.status(200).send({
            msg: 'Solicitud modificada con exito',
            solicitudModificada
        })
    } catch (error) {
        return res.status(500).send({msg: 'Ocurrio un error al crear la solicitud', error});
    }
}