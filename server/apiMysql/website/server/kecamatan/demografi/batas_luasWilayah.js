const express = require('express');

var db = require('../../../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM kecamatan_batas_luasWilayah;
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

    var des_kel = ''

    console.log(req.body)

    if (req.body.des_kel == undefined || req.body.des_kel == '') {
        des_kel = ''
    } else {
        des_kel = `&& datax.des_kel == '`+req.body.des_kel+`'`
    }


    var query = `
        
        FOR jmlData in kecamatan_batas_luasWilayah
        FILTER jmlData.uraian LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in kecamatan_batas_luasWilayah
            SORT datax.id
            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id : datax.id,
                luas : datax.luas,
                utara : datax.utara,
                barat : datax.barat,
                selatan : datax.selatan,
                timur : datax.timur
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
    var reques = JSON.stringify(req.body)
    var query = `
        insert `+reques+` into kecamatan_batas_luasWilayah
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
        FOR i in kecamatan_batas_luasWilayah
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN kecamatan_batas_luasWilayah
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})


router.post('/removeData', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN kecamatan_batas_luasWilayah
        filter data.id == '`+req.body.id+`'
        REMOVE data IN kecamatan_batas_luasWilayah
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})

// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

    var query = `
        FOR data IN kecamatan_batas_luasWilayah
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
