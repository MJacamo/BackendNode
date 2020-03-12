import app from './server';
import startConnection from './database/database';

async function main() {
    try {
        await startConnection();
        await app.listen(app.get('port'));
        console.log('server Activado.',app.get('port'))
    } catch (error) {
        console.error('Error al iniciar la aplicación:',error)
    }    
}

main();