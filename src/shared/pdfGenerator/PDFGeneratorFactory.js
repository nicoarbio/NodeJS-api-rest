import PDFGenerator from './PDFGenerator.js'

export { createPDFGenerator }

function createPDFGenerator(){
    return new PDFGenerator()
}