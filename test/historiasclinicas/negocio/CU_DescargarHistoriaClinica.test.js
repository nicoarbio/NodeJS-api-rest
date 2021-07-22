import CU_FactoryHistoriasClinicas from '../../../src/historiasclinicas/negocio/CU_FactoryHistoriasClinicas.js'

async function main() {
    
    const CU_DescargarHistoriaClinica = new CU_FactoryHistoriasClinicas.crearCU_DescargarHistoriaClinica()
    
    try {
        const ruta = await CU_DescargarHistoriaClinica.descargarHistoriaClinica(2)
        console.log(`Descarga en ruta:`)
        console.log(ruta)
    } catch (error) {
        console.log(error.message)
    }
}

main()