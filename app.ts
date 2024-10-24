

import dotentv from 'dotenv';
import Server from './src/models/server';


dotentv.config();



try{
    // servidor instancia
    const server = new Server();
    // si hay error
} catch(error){
    console.log(error)
}