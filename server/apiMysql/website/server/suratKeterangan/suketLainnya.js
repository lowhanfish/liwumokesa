const express = require('express');
// var db = require('../../../../db/Arango/connections');

var db = require('../../../../db/Arango/connections');

var multer = require("multer");
var upload = require('../../../../db/multer/pdf');
var IMAGE = require('../../../../library/image');
var uniqid = require('uniqid');

var qr = require('qr-image');

var ImageModule = require('docxtemplater-image-module-free');


// ================
// var toPdf = require("custom-soffice-to-pdf")
// var docxConverter = require('docx-pdf');
// var convertWordFiles = require('convert-multiple-files');

const { convertWordFiles } = require("convert-multiple-files");
// ================

const CONFIG =  require('../../../config/config');
const path = require('path');
const pdf = require('html-pdf');
const requestify = require('requestify');
const sharp = require('sharp');
const pdf2html = require('pdf2html');


const PizZip =  require('pizzip')
const Docxtemplater = require('docxtemplater');


const fs = require('fs')




const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM suketLainnya;
    `;
    db.query(view, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);
        }
    })
});



router.post('/viewMaster', (req, res) => {
    
    console.log(req.body)
    console.log("ONITUUUUUUUUUUUUU")

    
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke) * data_batas;
    var cari = req.body.cari_value;
    if (data_star < 0) { data_star = 0 }


    var query = `
        
        FOR jmlData in suketLainnya
        filter jmlData.des_kel == '`+req.body.des_kel+`'

        FILTER LOWER(jmlData.nama) LIKE '%`+ cari + `%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in suketLainnya
            filter datax.des_kel == '`+req.body.des_kel+`'

            FOR pegawai in desa_dataPegawai
            FILTER pegawai.des_kel == '`+req.body.des_kel+`' && pegawai.penandatangan == 'true'

            for masterjenissuket in masterJenisSuket
            FILTER masterjenissuket.id == datax.jenisSuket

            for desa in des_kel
            filter datax.des_kel == desa.uniqid

            for kecamatan in kecamatan
            filter kecamatan.id == desa.kecamatan

            FILTER LOWER(datax.nama) LIKE '%`+ cari + `%'

            SORT datax.createdAt DESC
            LIMIT `+ data_star + `, ` + data_batas + `
            return {
                data : datax,
                desa : desa,
                masterjenissuket : masterjenissuket,
                kecamatan : kecamatan,
                pegawai : pegawai
            }
        )

        return {
            data : data,
            jmlData : CEIL(length/`+ data_batas + `)
        }
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err)
            } else {
            res.send(row[0])
            }
        });



});

router.post('/view', (req, res) => {

    var query = `
        
        for data in suketLainnya
        filter data.createdBy == '`+req.user._id+`' && data.des_kel == '`+req.body.des_kel+`'
        
        return data
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err)
            } else {
                res.send(row)
            }
        });



});


router.post('/addData', upload.single("file"), (req, res) => {

    var data = req.body
    var datax = JSON.stringify(data.form)
    var formx = JSON.parse(datax)
    var form = JSON.parse(formx)

    form.id = uniqid();
    form.createdBy = req.user._id;
    form.status = 0;


    if (req.file == undefined || req.file == null || req.file == '') {
        delete form.file;
        console.log('File Kosong')
    } else {
        // IMAGE.resizeImg(req.file.filename);
        form.file = req.file.filename;
        console.log('tidak kosoooooooooooooooooong');
    }

    // console.log(data)

    var reques = JSON.stringify(form)

    var query = `
        insert `+ reques + ` into suketLainnya
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('sukses tambah data')
                res.send('OK')
            }
        });


    // // console.log(req.user)


    // console.log(typeof(form))
    // console.log(form)
    // console.log(req.file)


    // res.send('ok')


});

router.post('/editData', upload.single("file"), (req, res) => {

    var data = req.body
    var datax = JSON.stringify(data.form)
    var formx = JSON.parse(datax)
    var form = JSON.parse(formx)

    
    form.keterangan = 'Masih dalam proses pemeriksaan';
    form.editedBy = req.user._id;
    form.status = 0;

    
    
    if (req.file == undefined || req.file == null || req.file == '') {
        delete form.file;
        console.log('File Kosong')
    } else {
        // IMAGE.resizeImg(req.file.filename);
        IMAGE.hapus_file(req.body.fileOld);
        form.file = req.file.filename
        console.log('tidak kosoooooooooooooooooong');
    }
    
    console.log(form)
    var reques = JSON.stringify(form)
    console.log(reques)

    var query = `
        FOR i in suketLainnya
        FILTER i.id == '`+ form.id + `'
        UPDATE i WITH `+ reques + ` IN suketLainnya
    `
    // console.log(query)

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send('ok')
        });
})


router.post('/removeData', (req, res) => {

    // console.log(req.body);
    // res.send('ok')


    var reques = JSON.stringify(req.body)
    console.log(req.body)
    var query = `
        FOR data IN suketLainnya
        filter data.id == '`+ req.body.id + `'
        REMOVE data IN suketLainnya
    `

    console.log(query)

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {

            IMAGE.hapus_file(req.body.fileOld);
            res.send('ok')
        });
})


router.post('/verifikasi', async (req, res) => {

    await generateCard (req, res, 'idz')

    console.log(req.body);

    var datal = {
        status : 1
    }

    var reques = JSON.stringify(datal)
    console.log(reques)

    

    var query = `
        FOR i in suketLainnya
        FILTER i.id == '`+ req.body.id + `'
        UPDATE i WITH `+ reques + ` IN suketLainnya
    `

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err) => {
       
        res.send('ok')
    });


    // res.send('ok')
})


// ============================== TAMBAHAN ====================================

router.post('/list', (req, res) => {

    var query = `
        FOR data IN suketLainnya
        RETURN data
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });
})


router.get('/list', (req, res) => {

    var query = `
        FOR data IN suketLainnya
        RETURN data
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });
})




async function generateCard (req, res, idz) {

    console.log("=================");
    console.log(req.body);
    console.log("=================");


    let filexx =req.body.fileOld
    // const filex2 = filexx.split(".");
    // const filex3 = filex2.split(".");
    const filex = filexx.split(".");
    const fileOld = filex[0]
    
    const pathz = 'uploads/'
    // const in_filez = pathz+'contoh.docx'
    // const out_filez = pathz+'contoh1.docx'
    // const text_image = 'Contoh kata-kata'
    // const out_imagez = pathz+'contoh1.png'

    const in_filez = await pathz+ fileOld+'.docx'
    const out_filez = await  pathz+fileOld+'_generate.docx'
    const text_image = req.body.KODE_TTD
    const out_imagez = pathz+fileOld+'.png'
    const out_pdf = await pathz+ fileOld+'.pdf'
    
    
    var code = await qrcodex(text_image, out_imagez)



    var content = fs.readFileSync(in_filez)


    console.log(__dirname); 


    // var content = fs.readFileSync(path.join('', in_filez), 'binary');

    var zip = new PizZip(content);
    var doc = new Docxtemplater();

    // ==================================== IMAGE ========================================
    var opts = {}
    opts.centered = false; //Set to true to always center images
    opts.fileType = "docx"; //Or pptx

    opts.getImage = function(tagValue, tagName) {
        //tagValue is 'examples/image.png'
        //tagName is 'image'
        return fs.readFileSync(tagValue);
    }

    opts.getSize = function(img, tagValue, tagName) {
        //img is the image returned by opts.getImage()
        //tagValue is 'examples/image.png'
        //tagName is 'image'
        //tip: you can use node module 'image-size' here
        return [150, 150];
    }

    var imageModule = new ImageModule(opts);

    // ==================================== IMAGE ========================================

    doc.attachModule(imageModule);
    doc.loadZip(zip);
    //set the templateVariables
    doc.setData({
        // KODE_KECAMATAN: 'MORAMO',
        // KODE_DESA : 'TAMBOSUPA',
        // KODE_ALAMAT : 'Poros Moramo-Kendari',
        // KODE_NTTD : 'KASTIWA',
        // KODE_NOMOR : 'XXXX/2023',
        // KODE_TTD : 'uploads/contoh1.png',
        // KODE_TANGGAL : '20 Februari 2023',

        KODE_KECAMATAN: req.body.KODE_KECAMATAN,
        KODE_DESA : req.body.KODE_DESA,
        KODE_ALAMAT : req.body.KODE_ALAMAT,
        KODE_NTTD : req.body.KODE_NTTD,
        KODE_NOMOR : req.body.KODE_NOMOR,
        KODE_TTD : out_imagez,
        KODE_TANGGAL : req.body.KODE_TANGGAL,
    });

    try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
    }

    var buf = doc.getZip().generate({type: 'nodebuffer'});

    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    await fs.writeFileSync(out_filez, buf);

    await createPdfx(out_filez, out_pdf)
    

}




async function qrcodex (text_image, out_imagez){

    return new Promise((resolve, reject) => {
        
        var qr_svg = qr.image(text_image, { type: 'png' });
        qr_svg.pipe(require('fs').createWriteStream(out_imagez)).on('close', function() {
            resolve('qr_svg')
          });
    })
}



async function createPdfx (inputPathx, outputPathx){
    


    console.log(path.resolve(__dirname));

    // return new Promise( async (resolve, reject) => {


    //     // docxConverter(inputPathx,outputPathx,function(err,result){
    //     //     if(err){
    //     //       console.log(err);
    //     //     }
    //     //     console.log('result'+result);
    //     //   });
    // })


    const pathOutput = await convertWordFiles(inputPathx, 'pdf', 'uploads/');

    console.log('========================');
    console.log(pathOutput);
    console.log('========================');




}


// ============================== TAMBAHAN ====================================


module.exports = router;
