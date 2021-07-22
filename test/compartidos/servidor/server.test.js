import { PORT, URL } from '../../../src/config.js'
import axios from 'axios'
import { crearServidor } from '../../../src/compartidos/server/servidor.js'

async function main() {
    const servidor = crearServidor()

    await servidor.conectar({ port: PORT })
    
    try {
        
        const url = `${URL}/api/turnos`

        const maniana = new Date()
        maniana.setDate(maniana.getDate() + 1)

        const newTurno = await axios({
            url,
            method: 'post',
            data: {
                idMedico: 1,
                idPaciente: 1, 
                fechaHora: maniana
            }
        })
        console.log(`Nuevo turno confirmado:`)
        console.log(newTurno.data)
        
        const deletedTurno = await axios({
            url,
            method: 'delete',
            data: {
                idTurno: newTurno.data.nuevoTurno.id
            }
        })
        console.log(deletedTurno.data)
       
        const historiaClinica = await axios({
            url: `${URL}/api/historiasClinicas/`,
            method: 'get',
            data: {
                idPaciente: 1
            }
        })
        console.log(historiaClinica.data.ruta) 
        

    } catch (error) {
        const errormsg = error.response.status + ': ' + error.response.data.message
        console.log(errormsg)
    }
    //await servidor.desconectar()
}

main()