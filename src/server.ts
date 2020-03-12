/* -------------------- IMPORTACIONES -------------------- */

/* Importa Core Express */
import express, { Application } from 'express';

import path from 'path';

/* Importa middlewares */
import morgan from 'morgan';
import bodyParser from 'body-parser';

/* Importa rutas http */
import apiRoutes from './routes/apiRoutes';

/* Importa cors */
import cors from 'cors';

/* -------------------- FIN IMPORTACIONES ------------------- */


/*--------------------------------------------------------------------- */
/* -------------------- CONFIGURACION DEL SERVIDOR -------------------- */
/*--------------------------------------------------------------------- */

/* Crear servidor */
const app: Application = express();

/* Settings */
app.set('port', process.env.PORT || 4000);

/* Middlewares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors())

/* Routes */
app.use('/api', apiRoutes); 

/* Folder de archivos */
app.use('/public', express.static(path.resolve('/public')));

/* -------------------- FIN CONFIGURACION DEL SERVIDOR -------------------- */

export default app;
