import {connect, connection, ConnectionOptions} from 'mongoose';
import variables from '../keys';


export default async function startConnection() {

    const options:ConnectionOptions = {        
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    };

    await connect(variables.db, options).then(() => {
        console.log('Conexión a la base de datos establecida...', variables.db );
    }).catch((err) => console.log(`Error al conectar a la base de datos: ${err}`));    

    connection.on('error', err => {
        console.log(`La conexion a la BD esta presentando problemas: ${err}`);
        process.exit(0);
    });
}
