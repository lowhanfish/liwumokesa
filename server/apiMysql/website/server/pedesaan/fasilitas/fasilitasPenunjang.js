const express = require('express');

var db = require('../../../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM desa_fasilitasPenunjang;
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
        
        FOR jmlData in desa_fasilitasPenunjang
        FILTER jmlData.tahun == `+req.body.tahun+` `+cari_des_kel_jml+` 
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_fasilitasPenunjang
            for dataxx in masterFasilitasPenunjang
            FILTER datax.masterFasilitasPenunjang ==  dataxx.id && datax.tahun == `+req.body.tahun+` `+cari_des_kel+` 

            for des_kelx in des_kel
            FILTER datax.des_kel == des_kelx.uniqid

            SORT datax.des_kel
            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id : datax.id,
                des_kel : datax.des_kel,
                tahun : datax.tahun,
                masterFasilitasPenunjang : datax.masterFasilitasPenunjang,
                jumlah :datax.jumlah,
                masterFasilitasPenunjang_uraian : dataxx.uraian,
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
    var form = req.body.form
    var datax = req.body.data
    console.log("ASUUUUUUUUUUUUUUUUUUUUUUUUUUU");
    console.log(req.body)

    console.log(typeof(datax))


    datax.forEach(element => {
        var insert = {
            id : uniqid(),
            des_kel : form.des_kel,
            tahun : form.tahun,
            masterFasilitasPenunjang : element.id,
            jumlah : element.jumlah,
        }
        var reques = JSON.stringify(insert)
        var query = `
            insert `+reques+` into desa_fasilitasPenunjang
        `
        db.query(query)
        .then(cursor => cursor.all())
        .then((row, err)=>{
            // res.send('ok')
            if (err) {
                console.log(err)
            } else {
                console.log("Sukses")
            }
        });
    });



    res.send('ok')
});

router.post('/editData',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in desa_fasilitasPenunjang
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN desa_fasilitasPenunjang
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
        FOR data IN desa_fasilitasPenunjang
        filter data.id == '`+req.body.id+`'
        REMOVE data IN desa_fasilitasPenunjang
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
        FOR data IN desa_fasilitasPenunjang
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
