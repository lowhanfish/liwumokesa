const express = require('express');
var db = require('../../../../db/Arango/connections');
var multer = require("multer");
var upload = require('../../../../db/multer/pdf');
var IMAGE = require('../../../../library/image');

var uniqid = require('uniqid');
const router = express.Router();


router.get('/', (req, res) => {
    let view = `
        SELECT * FROM desa_dok_dokumenDesa;
    `;
     db.query(view, (err, row)=>{
        if(err) {
            res.send(err);
        }else{
            res.send(row);
        }
    })
});

router.post('/view', (req, res) => {
 
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke)* data_batas;
    var cari = req.body.cari_value;
    if (data_star <0) {data_star = 0} 

    var cari_kecamatan = ''
    var jmlData_kecamatan = ''
    var cari_des_kel = ''
    var jmlData_des_kel = ''

    if (req.body.kecamatan == undefined || req.body.kecamatan == null || req.body.kecamatan == false || req.body.kecamatan== '') {

        if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
            cari_des_kel = ''
            jmlData_des_kel = ''
        }else{
            cari_des_kel = `FILTER datax.des_kel == '`+req.body.des_kel+`'`
            jmlData_des_kel = `FILTER jmlData.des_kel == '`+req.body.des_kel+`'`
        }

    } else {

        if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
            cari_kecamatan = `FILTER  kec.id == "`+req.body.kecamatan+`"`
            jmlData_kecamatan = `FILTER  jmlKec.id == "`+req.body.kecamatan+`"`
            cari_des_kel = ''
            jmlData_des_kel = ''
        }else{
            cari_kecamatan = `FILTER  kec.id == "`+req.body.kecamatan+`"`
            jmlData_kecamatan = `FILTER  jmlKec.id == "`+req.body.kecamatan+`"`
            
            cari_des_kel = `FILTER datax.des_kel == '`+req.body.des_kel+`'`
            jmlData_des_kel = `FILTER jmlData.des_kel == '`+req.body.des_kel+`'`
        }

    }


    var query = `
        
        FOR jmlData in desa_dok_dokumenDesa

        for jmlDes_kel in des_kel
        filter jmlDes_kel.uniqid == jmlData.des_kel
        for jmlKec in kecamatan
        filter jmlKec.id == jmlDes_kel.kecamatan

        for user in users
        filter user.id == jmlData.createdBy

        `+jmlData_kecamatan+`
        `+jmlData_des_kel+`
        FILTER LOWER(jmlData.uraian) LIKE '%`+ cari + `%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_dok_dokumenDesa
            for des_kel in des_kel
            filter des_kel.uniqid == datax.des_kel
            for kec in kecamatan
            filter kec.id == des_kel.kecamatan


            for user in users
            filter user.id == datax.createdBy

            `+cari_kecamatan+`
            `+cari_des_kel+`
            FILTER LOWER(datax.uraian) LIKE '%`+ cari + `%'


            let jmlx_file = (

                for filex in desa_dok_dokumenDesa_file
                filter filex.desa_dok_dokumenDesa_id == datax.id
                COLLECT WITH COUNT INTO lengthx
                return lengthx
            )
            




            SORT datax._key DESC
            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id : datax.id,
                judul : datax.judul,
                uraian : datax.uraian,
                tahun : datax.tahun,
                des_kel : datax.des_kel,
                des_kel_uraian : des_kel.uraian,
                kecamatan : datax.kecamatan,
                kecamatan_uraian : kec.uraian,
                kelasFile : datax.kelasFile,
                createdAt : datax.createdAt,
                createdBy : datax.createdBy,
                createdBy_uraian : user.nama,
                jml_file : jmlx_file[0]
            }
        )

        return {
            data : data,
            jmlData : CEIL(length/`+data_batas+`)
        }
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row[0])
    });



});

router.post('/addData', (req,res)=>{

    req.body.createdBy = req.user._id;
    var reques = JSON.stringify(req.body)
    var query = `
        insert `+reques+` into desa_dok_dokumenDesa
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in desa_dok_dokumenDesa
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN desa_dok_dokumenDesa
    `

    // console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err)
        } else {
            res.send('ok')
        }
    });
})


router.post('/removeData', (req, res)=> {
    console.log(req.body);
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN desa_dok_dokumenDesa
        filter data.id == '`+req.body.id+`'
        REMOVE data IN desa_dok_dokumenDesa
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})




// ============================== FILE ====================================

router.post('/view_file', (req, res) => {


    var query = `
        
        FOR datax in desa_dok_dokumenDesa_file
        FILTER datax.desa_dok_dokumenDesa_id == '`+req.body.desa_dok_dokumenDesa_id+`'
        
        
        for des_kel in des_kel
        filter des_kel.uniqid == datax.des_kel
        for kec in kecamatan
        filter kec.id == des_kel.kecamatan
        SORT datax.id
        RETURN datax
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(row[0].data)
            res.send(row)
            }
        });



});



router.post('/addData_file', upload.single("file"), (req, res) => {


    console.log(req.file);
    var data = req.body;
    data.file = req.file.filename;
    data.file_type = req.file.mimetype;
    data.createdBy = req.user.username;
    console.log(data)

    var reques = JSON.stringify(data)

    var query = `
        insert `+ reques + ` into desa_dok_dokumenDesa_file
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send('ok')
        });


    // console.log(req.user)


    // res.send('ok')


});

router.post('/editData_file', upload.single("file"), (req, res) => {

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
        FOR i in desa_dok_dokumenDesa_file
        FILTER i.id == '`+ req.body.id + `'
        UPDATE i WITH `+ reques + ` IN desa_dok_dokumenDesa_file
    `
    // console.log(query)

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send('ok')
        });
})


router.post('/removeData_file', (req, res) => {

    // console.log(req.body);
    // res.send('ok')


    var reques = JSON.stringify(req.body)
    console.log(req.body)
    var query = `
        FOR data IN desa_dok_dokumenDesa_file
        filter data.id == '`+ req.body.id + `'
        REMOVE data IN desa_dok_dokumenDesa_file
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

// ============================== FILE ====================================








// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

    var query = `
        FOR data IN desa_dok_dokumenDesa
        FILTER data.des_kel == '`+req.body.des_kel+`'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})

// ============================== TAMBAHAN ====================================


module.exports = router;
