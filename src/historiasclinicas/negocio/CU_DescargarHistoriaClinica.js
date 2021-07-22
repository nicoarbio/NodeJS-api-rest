import { crearErrorDatosInvalidos } from '../../compartidos/errores/ErrorDatosInvalidos.js'
import { RUTA, URL } from '../../config.js'

class CU_DescargarHistoriaClinica {

    #daoPaciente
    #generadorPDF

    constructor(daoPaciente, generadorPDF) {
        this.#daoPaciente = daoPaciente
        this.#generadorPDF = generadorPDF
    }

    async descargarHistoriaClinica(idPaciente) {
        const paciente = await this.#daoPaciente.getById(idPaciente)
        if(!paciente){
            throw crearErrorDatosInvalidos('El paciente no existe')
        }
        
        const historia = paciente.getHistoriaClinica()
        if(!historia || historia.length == 0) {
            throw crearErrorDatosInvalidos('El paciente no posee historia clínica')
        }
        
        const FECHA_HORA = new Date().toISOString().substring(0,10) //devuelve aaaa-mm-dd
        const NOMBRE_ARCHIVO = paciente.getFullNameForFile() + `_${FECHA_HORA}.pdf`
        const DIRECTORIO_ARCHIVO = RUTA.historiasClinicas.archivosServidor + NOMBRE_ARCHIVO
        
        this.#generadorPDF.generarPdf(DIRECTORIO_ARCHIVO, paciente)
        
        return {
            servidor: `${RUTA.historiasClinicas.archivosServidor}/${NOMBRE_ARCHIVO}`,
            archivo: `${URL}${RUTA.historiasClinicas.endpoint.archivos}/${NOMBRE_ARCHIVO}`
        }
    }

}

export default CU_DescargarHistoriaClinica