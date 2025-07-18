const express = require('express');

var db = require('../../../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM desa_piramidaPenduduk;
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

    console.log(req.body)
 
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke)* data_batas;
    var cari = req.body.cari_value;
    if (data_star <0) {data_star = 0} 

    var cari_des_kel = ''
    var cari_des_kel_jml = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
        cari_des_kel_jml = ''
    }else{
        cari_des_kel = `&& datax.des_kel == '`+req.body.des_kel+`'`
        cari_des_kel_jml = `&& jmlData.des_kel == '`+req.body.des_kel+`'`
    }



    var query = `
        
        FOR jmlData in desa_piramidaPenduduk
        FILTER jmlData.tahun == `+req.body.tahun+` `+cari_des_kel_jml+` 
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_piramidaPenduduk

            FOR des_kelx in des_kel
            FILTER des_kelx.uniqid == datax.des_kel
            
            FILTER datax.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            SORT datax.id
            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id:datax.id,
                des_kel:datax.des_kel,

                u0_6 : datax.u0_6,
                u7_12 : datax.u7_12,
                u13_19 : datax.u13_19,
                u20_27 : datax.u20_27,
                u28_35 : datax.u28_35,
                u36_42 : datax.u36_42,
                u43_50 : datax.u43_50,
                u50_60 : datax.u50_60,
                u60_keatas : datax.u60_keatas,

                tahun:datax.tahun,
                createdAt:datax.createdAt,
                des_kel_uraian : des_kelx.uraian
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
        insert `+reques+` into desa_piramidaPenduduk
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
        FOR i in desa_piramidaPenduduk
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN desa_piramidaPenduduk
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
        FOR data IN desa_piramidaPenduduk
        filter data.id == '`+req.body.id+`'
        REMOVE data IN desa_piramidaPenduduk
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
        FOR data IN desa_piramidaPenduduk
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
