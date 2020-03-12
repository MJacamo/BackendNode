import {Router} from 'express';
import * as fileCtr from '../controllers/fileController'
import storage from '../libs/multer';
import {isAuth} from '../middleware/authMid';

const apiFile: Router = Router();

apiFile.post('/file',storage.single('file'),isAuth,fileCtr.crearFile);
apiFile.get('/files',isAuth, fileCtr.getFiles);
apiFile.get('/file/:id',isAuth, fileCtr.getFile);
apiFile.delete('/file/:id',isAuth, fileCtr.eliminarFile);


export default apiFile;