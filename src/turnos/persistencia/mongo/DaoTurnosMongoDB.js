import Turno from "../../modelos/Turno.js"
import Medico from "../../../compartidos/modelos/Medico.js"
import Paciente from "../../../compartidos/modelos/Paciente.js"

class DaoTurnosMongoDB {

    #nombreCollection
    #dbTurno
    
    constructor(db, coleccion){
        this.#dbTurno = db.collection(coleccion)
        this.#nombreCollection = coleccion
    }

    async #getNextIDMongo() {
        if(await this.#dbTurno.countDocuments({}) === 0) {
            return 1
        } else {
            const ids = await this.#dbTurno.find().map(turno => turno.id).toArray()
            const maxID = Math.max.apply(null, ids)
            return maxID + 1
        }
    }
    
    async #existe(datosTurno) {
        const existe = await this.#dbTurno.findOne({          
            "medico.id": datosTurno.medico.getId(),
            fechaHora: datosTurno.fechaHora
        })
        return !!existe
    }

    async addUnique(datosTurno) {
        if(!await this.#existe(datosTurno)) {
            datosTurno.id = await this.#getNextIDMongo()
            const nuevoTurno = new Turno(datosTurno)
            await this.#dbTurno.insertOne(nuevoTurno.getTurno())
            return nuevoTurno   
        }
    }

    async deleteById(id) {
        const eliminadoDoc = (await this.#dbTurno.findOneAndDelete( { id } )).value
        if(eliminadoDoc) return DaoTurnosMongoDB.#crearTurnoObj(eliminadoDoc)
    }

    async getByid(id) {
        const turnoDoc = await this.#dbTurno.findOne( { id } )
        if(!turnoDoc) {
            return DaoTurnosMongoDB.#crearTurnoObj(turnoDoc)
        }
    }

    async getAll() {
        const listTurnoDoc = await this.#dbTurno.find().toArray()
        const listaTurnoObj = []
        listTurnoDoc.forEach(turnoDoc => {
            listaTurnoObj.push(DaoTurnosMongoDB.#crearTurnoObj(turnoDoc))
        })
        return listaTurnoObj
    }
 
    static #crearTurnoObj(turnoDoc) {
        return new Turno( {
            id: turnoDoc.id,
            paciente: DaoTurnosMongoDB.#crearPacienteObj(turnoDoc.paciente),
            medico: new Medico(turnoDoc.medico),
            fechaHora: turnoDoc.fechaHora
        })
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

export default DaoTurnosMongoDB