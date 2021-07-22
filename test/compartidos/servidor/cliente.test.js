import { URL } from '../../../src/config.js'
import axios from 'axios'

async function main() {
    try {        
        const url = `${URL}/api/turnos`

        const maniana = new Date()
        maniana.setDate(maniana.getDate() + 1)

        /* const newTurno = await axios({
            url,
            method: 'post',
            data: {
                idPaciente: 2,
                idMedico: 1,
                fechaHora: new Date(2021,5,25)
            }
        })
        console.log(`Nuevo turno confirmado:`)
        console.log(newTurno.data)  */
        
        /* const deletedTurno = await axios({
            url,
            method: 'delete',
            data: {
                idTurno: 7
            }
        })
        console.log(`Nuevo turno eliminado:`)
        console.log(deletedTurno.data)  */
       
        const historiaClinica = await axios({
            url: `${URL}/api/historiasClinicas/`,
            method: 'get',
            data: {
                idPaciente: 2
            }
        })
        console.log(`Nueva historia clínica:`)
        console.log(historiaClinica.data.ruta) 
        

    } catch (error) {
        const errormsg = error.response.status + ': ' + error.response.data.message
        console.log(errormsg)
        //console.log(error)
    }
}

main()