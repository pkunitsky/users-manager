const path = require('path')
const PDFDocument = require('pdfkit')

class PDF {
  constructor ({fullName, imgBuff, job, about}) {
    this.fullName = fullName
    this.imgBuff = imgBuff
    this.about = about
    this.job = job

    this.init = this.init.bind(this)
  }

  init () {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument()
      const arrOfBuff = []

      // register listeners
      doc.on('data', miniBuff => {
        arrOfBuff.push(miniBuff)
      })
      doc.on('error', err => {
        reject(err)
      })
      doc.on('end', _ => {
        const bigBuff = Buffer.concat(arrOfBuff)
        resolve(bigBuff)
      })
    
      // define document
      doc.image(this.imgBuff, {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
      })
      doc.font(path.join(__dirname, './fonts/segoeui.ttf'))
        .fontSize(16)
        .text(`fullName: ${this.fullName}`)
        .text(`job: ${this.job}`)
        .text(`about: ${this.about}`)
      doc.end()
    })
  }
}

module.exports = PDF
