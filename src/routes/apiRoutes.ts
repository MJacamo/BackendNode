import {Router} from 'express';
import authRoute from './authRoutes';
import personaRoute from '../routes/personaRoutes';
import solicitudEstadoRoute from '../routes/solicitudEstadoRoutes';
import apiFile from '../routes/fileRoutes';

let apiRouter:Router [] = [];

apiRouter.push(authRoute);
apiRouter.push(personaRoute);
apiRouter.push(solicitudEstadoRoute);
apiRouter.push(apiFile);

export default apiRouter;