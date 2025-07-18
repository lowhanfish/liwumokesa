const express = require('express');

var db = require('../../../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM desa_keluarga;
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
        
        FOR jmlData in desa_keluarga
        FILTER jmlData.tahun == `+req.body.tahun+` `+cari_des_kel_jml+` 
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_keluarga

            FOR des_kelx in des_kel
            FILTER des_kelx.uniqid == datax.des_kel
            
            FILTER datax.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            SORT datax.id
            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id:datax.id,
                kk:datax.kk,
                des_kel:datax.des_kel,
                pria:datax.pria,
                wanita:datax.wanita,
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

router.post('/char_data_keluarga', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& datax2.des_kel == '`+req.body.des_kel+`'`
    }
    
    var query = `
    let wanita = (
        for datax2 in desa_keluarga
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.wanita)
    )
    
    let pria = (
        for datax2 in desa_keluarga
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.pria)
    )
    
    let kk = (
        for datax2 in desa_keluarga
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.kk)
    )
    
    return {
        wanita : SUM(wanita),
        pria : SUM(pria),
        kk : SUM(kk)
    
    }
    
    `
    
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(
                {
                    jumlah : [row[0].pria, row[0].wanita, row[0].kk],
                    uraian : ["Pria", "Wanita", "KK"]
                }
            )


        });

});

// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

    var query = `
        FOR data IN desa_keluarga
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
