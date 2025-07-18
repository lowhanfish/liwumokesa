const express = require('express');
// var db = require('../../../../db/Arango/connections');

var db = require('../../../../db/Arango/connections');

var multer = require("multer");
var upload = require('../../../../db/multer/pdf');
var IMAGE = require('../../../../library/image');

var uniqid = require('uniqid');
const sharp = require('sharp');


const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM desa_dok_perpustakaan_kegiatan;
    `;
    db.query(view, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);
        }
    })
});

router.post('/view', (req, res) => {

    console.log(req.body)

    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke) * data_batas;
    var cari = req.body.cari_value;
    if (data_star < 0) { data_star = 0 }


    var query = `
        
        FOR jmlData in desa_dok_perpustakaan_kegiatan
        FILTER jmlData.des_kel == '`+req.body.des_kel+`'
        FILTER jmlData.uraian LIKE '%`+ cari + `%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_dok_perpustakaan_kegiatan
            FILTER datax.des_kel == '`+req.body.des_kel+`'
            FILTER datax.uraian LIKE '%`+ cari + `%'

            SORT datax.id
            LIMIT `+ data_star + `, ` + data_batas + `
            RETURN datax
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
                console.log(row[0].data)
            res.send(row[0])
            }
        });



});



router.post('/addData', upload.single("file"), (req, res) => {

    IMAGE.resizeImg(req.file.filename)
    
    var data = req.body;
    data.file = req.file.filename;
    data.createdBy = req.user.username;
    data.fileThumb = 'thumbnail' + req.file.filename

    console.log(data)

    var reques = JSON.stringify(data)

    var query = `
        insert `+ reques + ` into desa_dok_perpustakaan_kegiatan
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send('ok')
        });


    // console.log(req.user)


    // res.send('ok')


});

router.post('/editData', upload.single("file"), (req, res) => {

    var data = req.body;
    // console.log(data)

    if (req.file == undefined || req.file == null || req.file == '') {
        delete data.file;
        console.log('File Kosong')
    } else {
        IMAGE.resizeImg(req.file.filename);
        IMAGE.hapus_file(req.body.fileOld);
        IMAGE.hapus_file('thumbnail' + req.body.fileOld);

        data.file = req.file.filename;
        data.fileThumb = 'thumbnail' + req.file.filename;
        console.log('tidak kosoooooooooooooooooong');
    }

    var reques = JSON.stringify(data);

    var query = `
        FOR i in desa_dok_perpustakaan_kegiatan
        FILTER i.id == '`+ req.body.id + `'
        UPDATE i WITH `+ reques + ` IN desa_dok_perpustakaan_kegiatan
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
        FOR data IN desa_dok_perpustakaan_kegiatan
        filter data.id == '`+ req.body.id + `'
        REMOVE data IN desa_dok_perpustakaan_kegiatan
    `

    console.log(query)

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {

            IMAGE.hapus_file(req.body.fileOld);
            IMAGE.hapus_file('thumbnail' + req.body.fileOld);

            res.send('ok')
        });
})

// ============================== TAMBAHAN ====================================

router.post('/list', (req, res) => {

    var query = `
        FOR data IN desa_dok_perpustakaan_kegiatan
        RETURN data
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });
})





// ============================== TAMBAHAN ====================================


module.exports = router;
