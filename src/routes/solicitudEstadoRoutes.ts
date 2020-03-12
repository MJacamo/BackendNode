import {Router} from 'express';

import { cambioEstadoSolicitud } from '../controllers/solicitudEstadoController'
import {isAuth} from '../middleware/authMid'

const solicitudEstadoRoute = Router();


solicitudEstadoRoute.post('/modificaEstadoSolicitud/:id', isAuth,  cambioEstadoSolicitud);


export default solicitudEstadoRoute; 