const express = require('express');
var db = require('../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();


router.get('/', (req, res) => {
    let view = `
        for data in masterJenisPamongJabatan
        return data
    `;
    db.query(view)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
});



router.post('/view', (req, res) => {
 
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke)* data_batas;
    var cari = req.body.cari_value;
    if (data_star <0) {data_star = 0} 


    var query = `
        
        FOR jmlData in masterJenisPamongJabatan
        FILTER LOWER(jmlData.uraian) LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in masterJenisPamongJabatan
            FILTER LOWER(datax.uraian) LIKE '%`+cari+`%'


            let jnsPamong = (
                for masterJenisPamongx in masterJenisPamong 
                FILTER masterJenisPamongx.id == datax.masterJenisPamong
                return masterJenisPamongx
            )

            let klpPamong = (
                for masterkelompokPamongJabatanx in masterkelompokPamongJabatan 
                FILTER masterkelompokPamongJabatanx.id == datax.masterkelompokPamongJabatan
                return masterkelompokPamongJabatanx
            )



            SORT datax.id
            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id : datax.id,
                uraian : datax.uraian,
                masterJenisPamong : datax.masterJenisPamong,
                keterangan : datax.keterangan,
                masterJenisPamong_uraian : jnsPamong[0].uraian,
                masterKelompokPamong_uraian : klpPamong[0].uraian
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

    req.body.id = uniqid();
    var reques = JSON.stringify(req.body)
    var query = `
        insert `+reques+` into masterJenisPamongJabatan
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
        FOR i in masterJenisPamongJabatan
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN masterJenisPamongJabatan
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
        FOR data IN masterJenisPamongJabatan
        filter data.id == '`+req.body.id+`'
        REMOVE data IN masterJenisPamongJabatan
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

    console.log(req.body);


    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

    var idx = ''
    if (req.body.id == null ||req.body.id == undefined || req.body.id == '') {
        idx = ''
    } else {
        idx = `(data.id == '`+req.body.id+`') AND`
    }



    var masterkelompokPamongJabatan = ''
    if (req.body.masterkelompokPamongJabatan == null ||req.body.masterkelompokPamongJabatan == undefined || req.body.masterkelompokPamongJabatan == '') {
        masterkelompokPamongJabatan = ''
    } else {
        masterkelompokPamongJabatan = `(data.masterkelompokPamongJabatan == '`+req.body.masterkelompokPamongJabatan+`') AND `
    } 











    console.log(req.body);

    var query = `
        FOR data IN masterJenisPamongJabatan
        FILTER 
        `+idx+`
        `+masterkelompokPamongJabatan+`
        LOWER(data.uraian) LIKE '%`+req.body.uraian+`%'
        LIMIT 8
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(row);
            res.send(row)
        }
    });
})

router.get('/list', (req, res)=> {

    var query = `
        FOR data IN masterJenisPamongJabatan
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
