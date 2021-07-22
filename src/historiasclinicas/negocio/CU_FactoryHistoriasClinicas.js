import CU_DescargarHistoriaClinica from './CU_DescargarHistoriaClinica.js'
import { TAM_HOJA, TIPOGRAFIA } from '../../config.js'

import daoFactory from '../../compartidos/persistencia/daoFactory.js'
const daoPacientes = daoFactory.getDaoPacientes()

import { crearGeneradorPdf } from '../../compartidos/pdfGenerator/GeneradorPdfFactory.js'
const generadorPDF = crearGeneradorPdf(TAM_HOJA, TIPOGRAFIA)

function crearCU_DescargarHistoriaClinica(){
    return new CU_DescargarHistoriaClinica(daoPacientes, generadorPDF)
}

export default {
    crearCU_DescargarHistoriaClinica
}
