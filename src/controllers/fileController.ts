import {Request ,Response } from 'express';
import {guardarCamposFile, eliminarCamposFile, ObtnerArchivo, ObtnerArchivos} from '../logic/file/fileClass';
import {getSolicitudIdPersona} from  '../logic/solicitud/solicitudClass';
import {modificaSolicitudEstado} from '../logic/solicitud_estado/solicitudEstadoClass';


/* Obtener todas los archivos */
 export async function getFiles( req: Request, res: Response): Promise<Response> { 
  try {
    const files = await ObtnerArchivos();
    return res.status(200).json({msg: 'Archivos enviados.', files}); 
  } catch (error) {
    console.error('Error en el metodo getFiles: ' , error);
    return res.status(500).json({msg: error});
  }
}

/* Obtener un archivo*/
export async function getFile( req: Request, res: Response): Promise<Response> {
  try {
    const file = await ObtnerArchivo(req.params.id);
    if (file == null) return res.status(400).json({msg:'Archivo no encontrado', file: {}});
    return res.status(200).json({msg: 'Archivo enviado.', file});
  } catch (error) {
    console.error('Error en el metodo getFile: ' , error);
    return res.status(500).json({msg: error});
  }
}

/* Crear */
export async function crearFile(req: Request, res: Response): Promise<Response> {
  try {

    if(req.file && req.body.idOrigen && req.body.origen ) {
                 
        const camposGuardados =  await guardarCamposFile(req);        
        
        if (camposGuardados == undefined) return res.status(400).json({msg: 'los datos no se pudieron guardar.'});  
        
        if(req.body.origen === 'personas') {

            const solicitud = await getSolicitudIdPersona(req.body.idOrigen);
            if(!solicitud) console.log('Verificar no obtuvo la solicitud');
            
            const modificaEstadoSolicitu = modificaSolicitudEstado(solicitud!._id, 'candidate');
            if(!modificaEstadoSolicitu) console.log('Verificar no modifico la solicitud');

        }
      
        return res.status(200).json({msg: 'Archivo Guardado.',file: camposGuardados })
    } 
    return res.status(400).json({msg: 'Archivo y parametros no recibido.'}); 

  } catch (error) {

    console.error('Error en el metodo crearFile: ' , error);
    return res.status(500).json({msg: error});

  } 
}

/* Eliminar */
export async function eliminarFile( req: Request, res: Response): Promise<Response> {
  try {

      const file = await eliminarCamposFile(req.params.id);
      if (file == undefined) return res.status(400).json({ msg: 'Archivo no encontrado' });
       return res.status(200).json({msg: 'Archivo elimando.', file});

  } catch (error) { 

    console.error('Ocuarrio un error en el metodo eliminarFile: ', error );      
    return res.status(500).json({ msg: error });

  } 
}



