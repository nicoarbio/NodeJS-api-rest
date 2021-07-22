import express from 'express'
import CU_FactoryHistoriasClinicas from '../negocio/CU_FactoryHistoriasClinicas.js'

const routerHistoriaClinica = express.Router()

routerHistoriaClinica.get('/', async (req, res, next) => {
    try{
        const CU_DescargarHistoriaClinica = CU_FactoryHistoriasClinicas.crearCU_DescargarHistoriaClinica()
        const ruta = await CU_DescargarHistoriaClinica.descargarHistoriaClinica(req.body.idPaciente)
        res.download(ruta.servidor) //No funciona
        res.status(200).json({
            ruta: ruta.archivo,
            msg: 'Se ha enviado el link de descarga al archivo'
        }) 
    } catch(error){
        next(error)
    }
})

routerHistoriaClinica.use((error, req, res, next) => {
    if (error.type === 'ERROR_DATOS_INVALIDOS') {
        res.status(400)
    } else {
        res.status(500)
    }
    res.json({ message: error.message })
})

export default routerHistoriaClinica