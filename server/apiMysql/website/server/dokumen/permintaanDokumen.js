const express = require('express');
var db = require('../../../../db/Arango/connections');
var multer = require("multer");
var upload = require('../../../../db/multer/pdf');
var IMAGE = require('../../../../library/image');

var uniqid = require('uniqid');
const router = express.Router();


router.get('/', (req, res) => {
    let view = `
        SELECT * FROM desa_dok_permintaanDokumen;
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

  


    var query = `
        
        FOR jmlData in desa_dok_permintaanDokumen

       

        for user in users
        filter user.id == jmlData.createdBy

        FILTER LOWER(jmlData.uraian) LIKE '%`+ cari + `%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_dok_permintaanDokumen
           
            for user in users
            filter user.id == datax.createdBy

            FILTER LOWER(datax.uraian) LIKE '%`+ cari + `%'


            let jmlx_file = (

                for filex in desa_dok_permintaanDokumen_file
                filter filex.desa_dok_permintaanDokumen_id == datax.id
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
                tgl_dari : datax.tgl_dari,
                tgl_sampai : datax.tgl_sampai,
                des_kel : datax.des_kel,
                kecamatan : datax.kecamatan,
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


    var form = req.body.form

    form.createdBy = req.user._id;
    var reques = JSON.stringify(form)
    var query = `
        insert `+reques+` into desa_dok_permintaanDokumen
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        // res.send('ok')


        var desa = req.body.selectDesa
        desa.forEach(element => {


            element.id = uniqid();
            element.desa_dok_permintaanDokumen_id = form.id;
            var requesx = JSON.stringify(element);
            var query1 = `
                insert `+requesx+` into desa_dok_permintaanDokumen_desa
            `
            db.query(query1)
            .then(cursor => cursor.all())
            .then((row1, err1)=>{
            });

        });

       
        
        res.send('ok')







    });


});

router.post('/editData',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in desa_dok_permintaanDokumen
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN desa_dok_permintaanDokumen
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

    var query = `
        FOR data IN desa_dok_permintaanDokumen
        filter data.id == '`+req.body.id+`'
        REMOVE data IN desa_dok_permintaanDokumen
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        

        var query1 = `
            FOR data IN desa_dok_permintaanDokumen_desa
            filter data.desa_dok_permintaanDokumen_id == '`+req.body.id+`'
            REMOVE data IN desa_dok_permintaanDokumen_desa
        `

        db.query(query1)
        .then(cursor => cursor.all())
        .then((row, err)=>{
            res.send('ok')
        });




    });
})




// ============================== FILE ====================================

router.post('/view_file', (req, res) => {


    var query = `
        
        FOR datax in desa_dok_permintaanDokumen_file
        FILTER datax.desa_dok_permintaanDokumen_id == '`+req.body.desa_dok_permintaanDokumen_id+`'
        
        
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
        insert `+ reques + ` into desa_dok_permintaanDokumen_file
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
        FOR i in desa_dok_permintaanDokumen_file
        FILTER i.id == '`+ req.body.id + `'
        UPDATE i WITH `+ reques + ` IN desa_dok_permintaanDokumen_file
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
        FOR data IN desa_dok_permintaanDokumen_file
        filter data.id == '`+ req.body.id + `'
        REMOVE data IN desa_dok_permintaanDokumen_file
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
        FOR data IN desa_dok_permintaanDokumen
        FILTER data.des_kel == '`+req.body.des_kel+`'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})

router.post('/update_list_desa', (req, res)=> {

    var form = req.body.form;
    var desa = req.body.selectDesa

    desa.forEach(element => {

        
        var query = `

            FOR data IN desa_dok_permintaanDokumen_desa
            filter 
            data.desa_dok_permintaanDokumen_id == '`+form.id+`' &&
            data.uniqid == '`+element.uniqid+`'
            REMOVE data IN desa_dok_permintaanDokumen_desa
        `
        
        db.query(query)
        .then(cursor => cursor.all())
        .then((row, err)=>{
    
    
                element.id = uniqid();
                element.desa_dok_permintaanDokumen_id = form.id;
                var requesx = JSON.stringify(element);
                var query1 = `
                    insert `+requesx+` into desa_dok_permintaanDokumen_desa
                `
                db.query(query1)
                .then(cursor => cursor.all())
                .then((row1, err1)=>{
                });
    
        
        });





    });


    res.send('ok')


})

router.post('/list_desa', (req, res)=> {

    var query = `
        FOR data IN desa_dok_permintaanDokumen_desa
        FILTER data.desa_dok_permintaanDokumen_id == '`+req.body.desa_dok_permintaanDokumen_id+`'
        RETURN {
            uraian : data.uraian,
            wilayah : data.wilayah,
            kab_kota : data.kab_kota,
            kecamatan : data.kecamatan,
            nama_kecamatan : data.nama_kecamatan,
            uniqid : data.uniqid,
            createdAt : data.createdAt,
            alamat : data.alamat
        }
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})


router.post('/removeData_desa', (req, res)=> {


    console.log(req.body);

    var query = `
        FOR data IN desa_dok_permintaanDokumen_desa
        filter 
        data.desa_dok_permintaanDokumen_id == '`+req.body.desa_dok_permintaanDokumen_id+`' &&
        data.uniqid == '`+req.body.uniqid+`'
        REMOVE data IN desa_dok_permintaanDokumen_desa
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('OK')
    });
})

// ============================== TAMBAHAN ====================================


module.exports = router;
