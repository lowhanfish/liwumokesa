const express = require('express');
var db = require('../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();


router.get('/', (req, res) => {
    let view = `
        for data in masterkelompokPamongJabatan
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
        
        FOR jmlData in masterkelompokPamongJabatan
        FILTER LOWER(jmlData.uraian) LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in masterkelompokPamongJabatan
            FILTER LOWER(datax.uraian) LIKE '%`+cari+`%'


            let jnsPamong = (
                for masterJenisPamongx in masterJenisPamong 
                FILTER masterJenisPamongx.id == datax.masterJenisPamong
                return masterJenisPamongx
            )



            SORT datax.id
            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id : datax.id,
                uraian : datax.uraian,
                masterJenisPamong : datax.masterJenisPamong,
                keterangan : datax.keterangan,
                masterJenisPamong_uraian : jnsPamong[0].uraian
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


    console.log("SATAAAAA");

    req.body.id = uniqid();
    var reques = JSON.stringify(req.body)
    var query = `
        insert `+reques+` into masterkelompokPamongJabatan
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
        FOR i in masterkelompokPamongJabatan
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN masterkelompokPamongJabatan
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
        FOR data IN masterkelompokPamongJabatan
        filter data.id == '`+req.body.id+`'
        REMOVE data IN masterkelompokPamongJabatan
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})

// ============================== TAMBAHAN ====================================


router.post('/list_master', (req, res)=> {

    // console.log(req.body);
    // console.log("SAYAAAAAAAAAAA");
    

    var masterJenisPamong = ''
    if (req.body.masterJenisPamong == null ||req.body.masterJenisPamong == undefined || req.body.masterJenisPamong == '') {
        masterJenisPamong = ''
    } else {
        masterJenisPamong = `(data.masterJenisPamong == '`+req.body.masterJenisPamong+`') AND `
    }


    var query = `
        FOR data IN masterkelompokPamongJabatan

        FILTER 

        `+masterJenisPamong+`

        LOWER(data.uraian) LIKE '%`+req.body.uraian+`%'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            // console.log(row);
            res.send(row)
        }
    });
})



router.post('/list', (req, res)=> {

    

    var idx = ''
    if (req.body.id == null ||req.body.id == undefined || req.body.id == '') {
        idx = ''
    } else {
        idx = `(data.id == '`+req.body.id+`') AND`
    }

    // console.log(req.body);

    var query = `
        FOR data IN masterkelompokPamongJabatan
        FILTER 
        `+idx+`
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
            // console.log(row);
            res.send(row)
        }
    });
})

router.get('/list', (req, res)=> {

    var query = `
        FOR data IN masterkelompokPamongJabatan
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
