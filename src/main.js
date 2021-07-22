import { PORT }  from './config.js'
import { crearServidor } from '../src/compartidos/server/servidor.js'

const servidor = crearServidor()

await servidor.conectar({ port: PORT })


//await servidor.desconectar()