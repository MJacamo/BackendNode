/* Modulos */
import {Request, Response } from 'express';
import fs from 'fs-extra';
import path from 'path';

/* Modelos - Interfaces */
import fileModel, {fileModelI} from '../../models/fileModel';



/* METODOS */
async function salvarFile(req: Request): Promise<boolean> {
    try {
        const ext = path.extname(req.file.originalname).toLowerCase();
        const imgUrl = req.file.filename
        const imageTempPath = req.file.path;
        const origen = req.body.origen;

       /* if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {  */
            if (origen === 'usuarios') {
                const targetPath = path.resolve(`public/userimage/${imgUrl}`);
                await fs.rename(imageTempPath , targetPath);
                return true;
            } else if (origen === 'personas') {
                const targetPath = path.resolve(`public/personadoc/${imgUrl}`);
                await fs.rename(imageTempPath , targetPath);
                return true;
            }                 
       /*  }  */
        return false;          
        
    } catch (error) {
        console.error('Error en el metodo salvar: ' , error);
        return false; 
    }
          
}

export async function guardarCamposFile(req:Request): Promise<fileModelI | undefined> {
    try {
        const salvoArchivo = await salvarFile(req); 
         
        if (salvoArchivo) {
            const nuevaImagen = {
                idPersona: req.body.id,
                tipo: req.file.mimetype,
                origen:req.body.origen,
                titulo: req.body.title,
                filename: req.file.filename,
                descripcion: 'nuevo archivo pruebas',
                imagenpath: `public/userimage/${req.file.filename}`       
            };
            
            const image:fileModelI = new fileModel(nuevaImagen);
            await image.save().then(()=> console.log('datos de archivo guardados en bd.'))
                              .catch(err => console.log('Error en el metodo save de mongosse', err))      
            return image;  
        }  
        return undefined; 
          
      } catch (error) {
        console.error('Error en el metodo guardarCamposFile: ' , error);
        return undefined;          
      }      
}

async function eliminarFile(ruta: string): Promise<boolean> {
    try {
        if (ruta){
            await fs.unlink(path.resolve(ruta));
            return true;
         }else{
            console.log('Parametro ruta no enviado');
            return false;
         }   
    } catch (error) {
        console.error('Error en el metodo eliminarFile: ' , error);
        return false;        
    } 
}

export async function eliminarCamposFile(id: string): Promise<fileModelI | undefined> {
    try {
        if (id) {
            const file = await fileModel.findByIdAndRemove(id);  
            await eliminarFile(file!.imagenpath);  
            return file!;
        }
        return undefined;
    } catch (error) {
        console.log('Ocurrio un error en el metodo eliminarCamposFile :', error);        
        return undefined;
    }
}


export async function ObtnerArchivo(_id: string):Promise<fileModelI | null> {
    try {
        if(_id){
            const file = await fileModel.findById(_id);
            return file;
        }
        return null;
    } catch (error) {
        console.error('Error en el metodo ObtnerArchivo: ' , error);
        return null;
    }
}

export async function ObtnerArchivos():Promise<fileModelI[] | null > {
    try {
            const file = await fileModel.find();
            return file;       
           
    } catch (error) {
        console.error('Error en el metodo ObtnerArchivo: ' , error);
        return null;
    }
} 


export async function ObtnerArchivoIdPersona(_id: string):Promise<fileModelI | null> {
    try {
        if(_id){
            const file = await fileModel.findOne({idPersona:_id});
            return file;
        }
        return null;
    } catch (error) {
        console.error('Error en el metodo ObtnerArchivo: ' , error);
        return null;
    }
}





