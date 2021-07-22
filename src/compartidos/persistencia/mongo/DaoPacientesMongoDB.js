import Paciente from '../../modelos/Paciente.js'
import Medico from '../../modelos/Medico.js'

class DaoPacientesMongoDB {

    #nombreCollection
    #dbPaciente

    constructor(db, coleccion){
        this.#dbPaciente = db.collection(coleccion)
        this.#nombreCollection = coleccion
    }
    
    async #getNextIDMongo() {
        if(await this.#dbPaciente.countDocuments({}) === 0) {
            return 1
        } else {
            const ids = await this.#dbPaciente.find().map(paciente => paciente.id).toArray()
            const maxID = Math.max.apply(null, ids)
            return maxID + 1
        }
    }
    
    async add(datosPaciente) {
        datosPaciente.id = await this.#getNextIDMongo()
        const nuevoPaciente = new Paciente(datosPaciente)
        await this.#dbPaciente.insertOne(nuevoPaciente.getPaciente())
        //envolver en un try?
        return nuevoPaciente
    }
    
    async deleteById(id) {
        const eliminadoDoc = (await this.#dbPaciente.findOneAndDelete( { id } )).value
        if(eliminadoDoc) return DaoPacientesMongoDB.#crearPacienteObj(eliminadoDoc)
    }
    
    async getById(id) {
        const pacienteDoc = await this.#dbPaciente.findOne( { id } )
        if(pacienteDoc != null) {
            const pacienteObj = DaoPacientesMongoDB.#crearPacienteObj(pacienteDoc) //new Persona
            return pacienteObj
        }            
        return null
    }

    async addConsultaHistoriaClinica(idPaciente, datosHC) {
        const pacienteObj = await this.getById(idPaciente)
        if (pacienteObj) {

            pacienteObj.agregarConsultaHistoriaClinica( datosHC )

            const indexLast = pacienteObj.getHistoriaClinica().length - 1

            const ultimaConsulta = pacienteObj.getHistoriaClinica()[indexLast]

            const query = { id: idPaciente }

            const updateDocument = {
                $push: { "historiaClinica": ultimaConsulta.getHistoriaClinica() },
            }

            await this.#dbPaciente.updateOne(query, updateDocument)

            return ultimaConsulta
        }
    }

    static #crearPacienteObj(pacienteDoc) {
        const pacienteObj = new Paciente(pacienteDoc)
        const listaConsultaDoc = pacienteDoc.historiaClinica
        if(listaConsultaDoc != null && listaConsultaDoc.length > 0){
            listaConsultaDoc.forEach(consultaDoc => {
                pacienteObj.agregarConsultaHistoriaClinica( { 
                    medico: new Medico(consultaDoc.medicoAsignado),
                    fechaHora: consultaDoc.fechaHora,
                    informacion: consultaDoc.informacion
                })
            })
        }
        return pacienteObj
    }

    async cerrar() {
        console.log(`Cerrando collección: ${this.#nombreCollection} en MongoDB`)
        await db.close()
    }
}

export default DaoPacientesMongoDB