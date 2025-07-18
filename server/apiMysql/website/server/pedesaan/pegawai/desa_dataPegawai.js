const express = require('express');
// var db = require('../../../../db/Arango/connections');

var db = require('../../../../../db/Arango/connections');

var multer = require("multer");
var upload = require('../../../../../db/multer/pdf');
var IMAGE = require('../../../../../library/image');

var uniqid = require('uniqid');
const sharp = require('sharp');

const router = express.Router();


router.post('/view', (req, res) => {
    // console.log(req.body)
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke) * data_batas;
    var cari = req.body.cari_value;
    if (data_star < 0) { data_star = 0 }


    var query = `
        
        FOR jmlData in desa_dataPegawai
        FILTER jmlData.des_kel == '`+req.body.des_kel+`'
        FILTER LOWER(jmlData.nama) LIKE '%`+ cari + `%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_dataPegawai
            FILTER datax.des_kel == '`+req.body.des_kel+`'

            for agamax in masterAgama 
            for pendidikanx in masterPendidikan
            FILTER pendidikanx.id==datax.pendidikan && agamax.id == datax.agama && LOWER(datax.nama) LIKE '%`+ cari + `%'

            let jnsJabatanPamong = (
                for masterJenisPamongJabatanx in masterJenisPamongJabatan 
                FILTER masterJenisPamongJabatanx.id == datax.masterJenisPamongJabatan


                let jnsPamong = (
                    for masterJenisPamongx in masterJenisPamong 
                    FILTER masterJenisPamongx.id == masterJenisPamongJabatanx.masterJenisPamong
                    return masterJenisPamongx
                )

                let klpPamong = (
                    for masterkelompokPamongJabatanx in masterkelompokPamongJabatan 
                    FILTER masterkelompokPamongJabatanx.id == masterJenisPamongJabatanx.masterkelompokPamongJabatan
                    return masterkelompokPamongJabatanx
                )




                return {
                    masterJenisPamongJabatanx_uraian : masterJenisPamongJabatanx.uraian,
                    masterJenisPamong_uraian : jnsPamong[0].uraian,
                    masterKelompokPamong_uraian : klpPamong[0].uraian,
                    masterKelompokPamong_id : klpPamong[0].id
                }
            )


            SORT datax.id
            LIMIT `+ data_star + `, ` + data_batas + `
            RETURN {
                id : datax.id,
                nama : datax.nama,
                nip : datax.nip,
                pangkat_gol : datax.pangkat_gol,
                jabatan : datax.jabatan,
                tpt_lahir : datax.tpt_lahir,
                tgl_lahir : datax.tgl_lahir,
                des_kel : datax.des_kel,
                pendidikan : datax.pendidikan,
                pendidikan_uraian : pendidikanx.uraian,
                agama : datax.agama,
                penandatangan : datax.penandatangan,
                masterJenisPamongJabatan : datax.masterJenisPamongJabatan,
                masterJenisPamongJabatan_uraian : jnsJabatanPamong[0].masterJenisPamongJabatanx_uraian,
                masterJenisPamong_uraian : jnsJabatanPamong[0].masterJenisPamong_uraian,
                masterKelompokPamong_uraian : jnsJabatanPamong[0].masterKelompokPamong_uraian,
                masterkelompokPamongJabatan : jnsJabatanPamong[0].masterKelompokPamong_id,
                agama_uraian : agamax.uraian,
                createdAt : datax.createdAt,
                file : datax.file,
                createdBy : datax.createdBy,
                fileThumb : datax.fileThumb,
                zzzzz : 'xxxxxx'

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
                // console.log(row[0].data)
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

    // console.log(data)

    var reques = JSON.stringify(data)

    var query = `
        insert `+ reques + ` into desa_dataPegawai
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
    // console.log('AAAAAAAAAAAAAAAAAAAAA');
    // console.log(data);

    if (req.file == undefined || req.file == null || req.file == '') {
        delete data.file;
        // console.log('File Kosong')
    } else {
        IMAGE.resizeImg(req.file.filename);
        IMAGE.hapus_file(req.body.fileOld);
        IMAGE.hapus_file('thumbnail' + req.body.fileOld);

        data.file = req.file.filename;
        data.fileThumb = 'thumbnail' + req.file.filename;
        // console.log('tidak kosoooooooooooooooooong');
    }

    var reques = JSON.stringify(data);

    var query = `
        FOR i in desa_dataPegawai
        FILTER i.id == '`+ req.body.id + `'
        UPDATE i WITH `+ reques + ` IN desa_dataPegawai
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
    // console.log(req.body)
    var query = `
        FOR data IN desa_dataPegawai
        filter data.id == '`+ req.body.id + `'
        REMOVE data IN desa_dataPegawai
    `

    // console.log(query)

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
        FOR data IN desa_dataPegawai
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
