const express = require('express');
// var db = require('../../../../db/Arango/connections');

var db = require('../../../../db/Arango/connections');

var multer = require("multer");
var upload = require('../../../../db/multer/pdf');
var IMAGE = require('../../../../library/image');

var CONFIG =  require('../../../config/config');
const path = require('path');
var pdf = require('html-pdf');
var requestify = require('requestify');


var uniqid = require('uniqid');
const sharp = require('sharp');


const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM suketTidakMampu;
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
    // console.log("XXXXXXXXXXXXXXXXXXXXXXX");
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke) * data_batas;
    var cari = req.body.cari_value;
    if (data_star < 0) { data_star = 0 }


    var query = `
        
        FOR jmlData in suketTidakMampu
        filter jmlData.des_kel == '`+req.body.des_kel+`'
            for agama in masterAgama
            filter agama.id == jmlData.agama

        FILTER LOWER(jmlData.nama) LIKE '%`+ cari + `%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in suketTidakMampu
            filter datax.des_kel == '`+req.body.des_kel+`'

                for agama in masterAgama
                filter agama.id == datax.agama

                FOR pegawai in desa_dataPegawai
                FILTER pegawai.des_kel == '`+req.body.des_kel+`' && pegawai.penandatangan == 'true'

                for desa in des_kel
                filter datax.des_kel == desa.uniqid

                for kecamatan in kecamatan
                filter kecamatan.id == desa.kecamatan

                for pekerjaan in masterPekerjaan
                filter pekerjaan.id == datax.pekerjaan




            FILTER LOWER(datax.nama) LIKE '%`+ cari + `%'

            SORT datax.createdAt DESC
            LIMIT `+ data_star + `, ` + data_batas + `
            return {
                data : datax,
                agama : agama,
                pegawai : pegawai,
                desa : desa,
                kecamatan : kecamatan,
                pekerjaan : pekerjaan
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
    // console.log('DARI CLIEEEENTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
    var query = `
        
        for data in suketTidakMampu
        filter data.createdBy == '`+req.user._id+`' && data.des_kel == '`+req.body.des_kel+`'

            for agama in masterAgama
            filter agama.id == data.agama

            FOR pegawai in desa_dataPegawai
            FILTER pegawai.des_kel == '`+req.body.des_kel+`' && pegawai.penandatangan == 'true'

            for pekerjaan in masterPekerjaan
            filter pekerjaan.id == data.pekerjaan

        SORT data.createdAt
        
        return {
            data : data,
            agama : agama,
            pegawai : pegawai,
            pekerjaan : pekerjaan
        }
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
        insert `+ reques + ` into suketTidakMampu
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
        FOR i in suketTidakMampu
        FILTER i.id == '`+ form.id + `'
        UPDATE i WITH `+ reques + ` IN suketTidakMampu
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
        FOR data IN suketTidakMampu
        filter data.id == '`+ req.body.id + `'
        REMOVE data IN suketTidakMampu
    `

    console.log(query)

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {

            IMAGE.hapus_file(req.body.fileOld);
            res.send('ok')
        });
})


router.post('/verifikasi', upload.single("file"), (req, res) => {

    var reques = JSON.stringify(req.body)
    console.log(reques)

    

    var query = `
        FOR i in suketTidakMampu
        FILTER i.id == '`+ req.body.id + `'
        UPDATE i WITH `+ reques + ` IN suketTidakMampu
    `


    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err) => {
        generateCard(req, res, req.body.id)
        res.send('ok')
    });
})


// ============================== TAMBAHAN ====================================

router.post('/list', (req, res) => {

    var query = `
        FOR data IN suketTidakMampu
        RETURN data
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });
})




function generateCard (req, res, idz) {

        var urlServer = CONFIG.URL
        var IDX = idz
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        var externalURL = urlServer+`cnt_suketTidakMampu?id=`+IDX
    
        console.log(externalURL)
        requestify.get(externalURL).then(function (response) {
            // Get the raw HTML response body
    
            console.log('Okeee')
            var html = response.body; 
            var config = {
                // format: 'A4',
                // orientation: 'landscape',
                
                // width: '1123px',
                // height: '794px',
                // width: '794px',
                // height: '1223px',

                // width: '1240px',
                // height: '1748px',

                width: '1123px',
                height: '1587px',

                base : [
                    urlServer+'css/huruf.css',
                    urlServer+'css/main.css',
                    'https://fonts.gstatic.com',
                    'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap',
                    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css'
                ],
           
            };
            
            // var output = 'uploads/card' + gelombang_id + '' + tahun_id + '' + userId + '.pdf'
            var output = path.join(__dirname, '../../../../uploads/'+IDX+'.pdf');
            console.log(output)
         // Create the PDF
            pdf.create(html, config).toFile(output, function (errz, resz) {
                console.log('Tapiii')
               if (errz) return console.log(errz);
               console.log(resz); // { filename: '/pathtooutput/generated.pdf' }
                    // res.send("okemix")

                    console.log("SA CAPEK SETANG.... !!!!")
    
                    // var data = fs.readFileSync(output);
                    // res.contentType("application/pdf");
                    // res.send(data);
            });
         });
    

}


// ============================== TAMBAHAN ====================================


module.exports = router;
