const express = require('express');
var db = require('../../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM visi;
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
        
        FOR jmlData in visi

        for jmlDes_kel in des_kel
        filter jmlDes_kel.uniqid == jmlData.des_kel
        for jmlKec in kecamatan
        filter jmlKec.id == jmlDes_kel.kecamatan

        `+jmlData_kecamatan+`
        `+jmlData_des_kel+`
        FILTER LOWER(jmlData.uraian) LIKE '%`+ cari + `%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in visi
            for des_kel in des_kel
            filter des_kel.uniqid == datax.des_kel
            for kec in kecamatan
            filter kec.id == des_kel.kecamatan

            `+cari_kecamatan+`
            `+cari_des_kel+`
            FILTER LOWER(datax.uraian) LIKE '%`+ cari + `%'
            SORT datax._key DESC
            LIMIT `+data_star+`, `+data_batas+`
            RETURN datax
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
        insert `+reques+` into visi
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
        FOR i in visi
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN visi
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
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN visi
        filter data.id == '`+req.body.id+`'
        REMOVE data IN visi
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
        FOR data IN visi
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
