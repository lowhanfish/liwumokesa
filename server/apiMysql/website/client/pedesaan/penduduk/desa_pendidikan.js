const express = require('express');

var db = require('../../../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM desa_pendidikan;
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
        
        FOR jmlData in desa_pendidikan
        FILTER jmlData.tahun == `+req.body.tahun+` `+cari_des_kel_jml+` 
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_pendidikan
            for dataxx in masterPendidikan
            FILTER datax.masterPendidikan ==  dataxx.id && datax.tahun == `+req.body.tahun+` `+cari_des_kel+` 

            for des_kelx in des_kel
            FILTER datax.des_kel == des_kelx.uniqid

            SORT datax.des_kel
            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id : datax.id,
                des_kel : datax.des_kel,
                tahun : datax.tahun,
                masterPendidikan : datax.masterPendidikan,
                jumlah :datax.jumlah,
                masterPendidikan_uraian : dataxx.uraian,
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

router.post('/chart_data_pendidikan', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& jen_pendidikan.des_kel == '`+req.body.des_kel+`'`
    }
    
    var query = `
    for data in masterPendidikan
    let pendidikan = (
        for jen_pendidikan in desa_pendidikan
        filter data.id == jen_pendidikan.masterPendidikan
        filter jen_pendidikan.tahun == `+req.body.tahun+` `+cari_des_kel+`  
        return TO_NUMBER(jen_pendidikan.jumlah)
    
    )
    return {
        uraian : data.uraian,
        jumlah : SUM(pendidikan)
    } 
    
    `
    
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            var uraian = [];
            var jumlah = [];
            
            row.forEach(element => {
                uraian.push(element.uraian);
                jumlah.push(element.jumlah)
            });
            
            res.send(
                    {
                        jumlah : jumlah,
                        uraian : uraian
                    }
                )


        });

});

// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

    var query = `
        FOR data IN desa_pendidikan
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
