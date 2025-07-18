const express = require('express');
var db = require('../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
 
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke)* data_batas;
    var cari = req.body.cari_value;
    if (data_star <0) {data_star = 0} 


    console.log(req.body)


    var query = `
        
        FOR jmlData in kecamatan
        FILTER jmlData.uraian LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR i in kecamatan
            FILTER i.uraian LIKE '%`+cari+`%'
            SORT i.createdAt
            LIMIT `+data_star+`, `+data_batas+`

            FOR j in kab_kota
            filter j.id == i.kab_kota

            FOR k in wilayah
            filter k.id == j.wilayah



            return {
                kecamatan : i,
                kab_kota : j,
                wilayah : k
            
            }
        )

        return {
            data : data,
            jmlData : CEIL(length/`+data_batas+`),
            length : length
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
        insert `+reques+` into kecamatan
    `

    console.log(query)
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData',(req, res) => {
    var reques = JSON.stringify(req.body)
    console.log(reques)
    var query = `
        FOR i in kecamatan
        FILTER i.uniqid == '`+req.body.uniqid+`'
        UPDATE i WITH `+reques+` IN kecamatan
    `

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})
router.post('/removeData', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN kecamatan
        filter data.uniqid == '`+req.body.uniqid+`'
        REMOVE data IN kecamatan
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
        FOR data IN kecamatan
        filter data.kab_kota == '`+req.body.kab_kota+`'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})

router.get('/listAll', (req, res)=> {

    var query = `
        FOR data IN kecamatan
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})



router.get('/listSingle', (req, res)=> {

    var query = `
        FOR data IN kecamatan
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})


router.get('/autocomplete', (req, res)=> {
    console.log(req.query.q)
    var query = `
        FOR data IN kecamatan
        filter LOWER(data.uraian) LIKE '%`+req.query.q+`%'
        
        FOR data1 IN kab_kota
        filter data.kab_kota == data1.id

        RETURN {
            uraian : data.uraian,
            kecamatan : data,
            kab_kota : data1
        }
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})

// ============================== TAMBAHAN ====================================



module.exports = router;
