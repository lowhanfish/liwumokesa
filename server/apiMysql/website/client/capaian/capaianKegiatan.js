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
        SELECT * FROM capaianKegiatan;
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

    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke) * data_batas;
    var cari = req.body.cari_value;
    if (data_star < 0) { data_star = 0 }

    console.log(req.body)

    var kategori1 = '';
    var kategori2 = '';
    if (req.body.kategori == null || req.body.kategori == undefined || req.body.kategori == '') {
        console.log('kosong');
        kategori1 = ``
        kategori2 = ``
    } else {
        console.log('ada');
        kategori1 = ` && jmlData.kategori == '`+req.body.kategori+`'`
        kategori2 = ` && datax.kategori == '`+req.body.kategori+`'`
    }
    
    var tahun1 = '';
    var tahun2 = '';
    if (req.body.tahun == null || req.body.tahun == undefined || req.body.tahun == '') {
        console.log('kosong');
        tahun1 = ``
        tahun2 = ``
    } else {
        console.log('ada');
        tahun1 = ` && jmlData.tahun == '`+req.body.tahun+`'`
        tahun2 = ` && datax.tahun == '`+req.body.tahun+`'`
    }


    var query = `
        
        FOR jmlData in capaianKegiatan
        FILTER jmlData.des_kel == '`+req.body.des_kel+`'
        FILTER LOWER(jmlData.uraian) LIKE '%`+ cari + `%'
        `+kategori1+`
        `+tahun1+`
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in capaianKegiatan
            FILTER datax.des_kel == '`+req.body.des_kel+`'
            FILTER LOWER(datax.uraian) LIKE '%`+ cari + `%'
            `+kategori2+`
            `+tahun2+`
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
            res.send(row[0])
        });



});



// ============================== TAMBAHAN ====================================

router.post('/list', (req, res) => {

    var query = `
        FOR data IN capaianKegiatan
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
