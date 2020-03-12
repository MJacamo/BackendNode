import {Router} from 'express';

import { registrarPersona, getPersonaId } from '../controllers/personaController'
import {isAuth} from '../middleware/authMid'

const personaRoute = Router();


personaRoute.get('/getPersonaId/:id', isAuth,  registrarPersona);
personaRoute.post('/registrarPersona', isAuth,  registrarPersona);


export default personaRoute; 