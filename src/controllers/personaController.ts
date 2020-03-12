import {Request ,Response } from 'express';
import {personaModelI} from '../models/personaModel';
import {guardarPersona, verificaPersona, getPersona} from '../logic/persona/personaClass';
import {guardarSolicitud} from '../logic/solicitud/solicitudClass'
 
export async function registrarPersona ( req: Request, res: Response):Promise<Response> {
    try {

        const personaRegistro:personaModelI = req.body;

        // valido que vengan los campos requeridos
        if(!personaRegistro.nombre && !personaRegistro.correo && !personaRegistro.idSeguro){
            return res.status(400).send({msg: 'Campos incompletos'});
        }      
        
         // valido que el valor idSeguro no sea mayor a 9 digitos
         if(personaRegistro.idSeguro.length > 9){
            return res.status(400).send({msg: 'El codigo de seguro social no debe exceder los 9 digitos'});
        } 
        
        /* Verifico que no exista la persona, basado en el codigo de seguro social*/
        const existeCodigoPersona = await verificaPersona(personaRegistro.idSeguro, 'codigo') as personaModelI ;              
        if (existeCodigoPersona) return res.status(400).send({msg: 'Persona ya resgistrada'});
       
        
        /* Registro la persona  */
        const persona = await guardarPersona(personaRegistro) as personaModelI;
        if (!persona) return res.status(400).send({msg: 'Persona no registrado'});

        /*Opcional: crear la solicitud al momento de crear la persona */
        const solicitudNueva = {
            idpersona: persona._id,
            plaza: 'Desarrollador'
        };
        const crearSolicitud = await guardarSolicitud(solicitudNueva);       
        
        if (!crearSolicitud) return res.status(400).send({
            msg: 'Error al generar solicitud de empleo'
        }); 

        return res.status(200).send({
            msg: 'Persona registrada',
            persona
        });        

    } catch (error) {
        return res.status(500).send({msg: 'Ocurrio un error al registrar la persona', error});
    }
}


export async function getPersonaId ( req: Request, res: Response):Promise<Response> {
    try {

        const{ id } = req.params;
        // valido que venga el parametro

        if(id){
            const persona = await getPersona(id) as personaModelI;
            return res.status(200).send({
                msg: 'Campos incompletos',
                persona
            });
        }else{
            return res.status(400).send({msg: 'Persona no existe'});
        }
        
    } catch (error) {
        return res.status(500).send({msg: 'Ocurrio un error al obtner la persona', error});
        
    }
}