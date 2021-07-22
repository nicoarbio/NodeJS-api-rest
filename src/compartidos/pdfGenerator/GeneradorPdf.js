import PDFDocument from 'pdfkit'
import fs from 'fs'

class GeneradorPdf{
    
    #tamHoja
    #tipografia

    constructor(tamHoja, tipografia) {
        this.#tamHoja = tamHoja
        this.#tipografia = tipografia           
    } 

    async generarPdf (nomArchivo, paciente) {
        const doc = new PDFDocument({size: this.#tamHoja, font: this.#tipografia});
        doc.pipe(fs.createWriteStream(nomArchivo));
        
        doc.fillColor('red').text(`Historia Clínica de: ${paciente.getFullName()}`, {
            align: 'center',
            underline: true
        });

        doc.fontSize(10);
        doc.moveDown()
        doc.text(`Dni: ${paciente.getDNI()}`, {
        }); 

        doc.moveDown()
        doc.text(`Direccion de E-mail: ${paciente.getEmail()}`, {
          
        });

        doc.moveDown()
        doc.text(`Edad: ${paciente.getAge()}`, {
        
        });

        doc.moveDown()
        doc.text(`Foto: `, {
       
        });

        doc.moveDown()
        try {
            doc.image(paciente.getPathImagen(), {
                fit: [200, 100],
                align: 'center',
                text: 'Paciente'
            });   
        } catch (error) {
            console.log(error)
            doc.text(`No se encontró la imagen`, {});
        }
        
        doc.moveDown() 
        doc.addPage ({size: this.#tamHoja});

        doc.moveDown()
        doc.fillColor('red').text(`Historia clinica de: ${paciente.getFullName()}`, {
            align: 'center',
            underline: true
        });

        doc.fontSize(10);
        doc.moveDown()
        doc.fillColor('black').text(`Consultas:`, {
            width: 410,
            align: 'left'
        }); 
        doc.moveDown()
        let i = 1;
        for (const consulta of paciente.getHistoriaClinica()) {
            doc.moveDown()
            doc.moveDown()
            doc.text(`Consulta numero ${i}:`, {
                underline: true
            });

            doc.moveDown()
            doc.text(`Médico: ${consulta.getMedicoAsignado().getFullName()} `, {
                
            });

            doc.moveDown()
            doc.text(`Especialidad: ${consulta.getMedicoAsignado().getEspecialidad()} `, {
                
            });
            doc.moveDown()
            doc.text(`Fecha y Hora: ${consulta.printFechaHora()}`, {
                
            });
            doc.moveDown()
            doc.text(`Datos de la consulta:  ${consulta.getInformacion()} `, {
               
            });
          
            doc.moveDown()
            i++
        }

        doc.end();
    }
}

export default GeneradorPdf 