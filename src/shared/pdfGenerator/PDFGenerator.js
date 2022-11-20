import PDFDocument from 'pdfkit'
import fs from 'fs'

export default PDFGenerator

class PDFGenerator {
    
    #sheetSize
    #typography

    constructor(sheetSize, typography) {
        this.#sheetSize = sheetSize
        this.#typography = typography
    } 

    async generatePDF (filename, patient) {
        const doc = new PDFDocument({size: this.#sheetSize, font: this.#typography});
        doc.pipe(fs.createWriteStream(filename));
        
        doc.fillColor('red').text(`Clinical History of: ${patient.getFullName()}`, {
            align: 'center',
            underline: true
        });

        doc.fontSize(10);
        doc.moveDown()
        doc.text(`ID: ${patient.getID()}`, {}); 

        doc.moveDown()
        doc.text(`E-mail Address: ${patient.getEmail()}`, {});

        doc.moveDown()
        doc.text(`Age: ${patient.getAge()}`, {});

        doc.moveDown()
        doc.text(`Picture: `, {});

        doc.moveDown()
        try {
            doc.image(patient.getPathImg(), {
                fit: [200, 100],
                align: 'center',
                text: 'Patient'
            });   
        } catch (error) {
            console.log(error)
            doc.text(`Image not found`, {});
        }
        
        doc.moveDown() 
        doc.addPage({size: this.#sheetSize});

        doc.moveDown()
        doc.fillColor('red').text(`Clinical History of: ${patient.getFullName()}`, {
            align: 'center',
            underline: true
        });

        doc.fontSize(10);
        doc.moveDown()
        doc.fillColor('black').text(`Visits:`, {
            width: 410,
            align: 'left'
        }); 
        doc.moveDown()
        let i = 1;
        for (const visit of patient.getClinicalHistory()) {
            doc.moveDown()
            doc.moveDown()
            doc.text(`Visit #${i}:`, {
                underline: true
            });

            doc.moveDown()
            doc.text(`Doctor: ${visit.getAssignedDoctor().getFullName()} `, {
                
            });

            doc.moveDown()
            doc.text(`Especialidad: ${visit.getAssignedDoctor().getSpecialty()} `, {
                
            });
            doc.moveDown()
            doc.text(`Date: ${visit.printDate()}`, {
                
            });
            doc.moveDown()
            doc.text(`Visit information: ${visit.getInformacion()} `, {
               
            });
          
            doc.moveDown()
            i++
        }
        doc.end();
    }
}