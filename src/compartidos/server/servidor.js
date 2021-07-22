import express from 'express'
import routerTurnos from '../../turnos/ruteo/routerTurnos.js'
import routerHistoriasClinicas from '../../historiasclinicas/ruteo/routerHistoriasClinicas.js'
import { RUTA, URL } from '../../config.js'

function crearServidor() {
    const app = express()
    app.use(express.json())

    app.use(RUTA.turnos.endpoint.datos, routerTurnos)
    app.use(RUTA.historiasClinicas.endpoint.datos, routerHistoriasClinicas)
    app.use(RUTA.historiasClinicas.endpoint.archivos, express.static(RUTA.historiasClinicas.archivosServidor))

    let server = null
    return {
        conectar: ( { port } ) => {
        return new Promise((resolve, reject) => {
            if (server) {
                reject(new Error('Servidor ya conectado'))
            } else {
                server = app.listen(port, () => {
                    console.log(`Servidor inicializado en ${URL}`)
                    resolve()
                })
                server.on('error', (err) => {
                    reject(err)
                })
            }
        })
        },
        desconectar: () => {
            return new Promise((resolve, reject) => {
                server.close((err) => {
                    if (err) {
                        reject(err)
                    } else {
                        server = null
                        resolve()
                    }
                })
            })
        }
    }
}

export { crearServidor }
