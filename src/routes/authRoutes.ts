import {Router} from 'express';

import {login, registrar } from '../controllers/authController'

const authRoute = Router();


authRoute.post('/registrar', registrar);
authRoute.post('/login', login);

export default authRoute; 