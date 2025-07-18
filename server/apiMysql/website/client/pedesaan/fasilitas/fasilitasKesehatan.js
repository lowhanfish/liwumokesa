const express = require('express');

var db = require('../../../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM desa_fasilitasKesehatan;
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
        
        FOR jmlData in desa_fasilitasKesehatan
        FILTER jmlData.tahun == `+req.body.tahun+` `+cari_des_kel_jml+` 
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_fasilitasKesehatan
            for dataxx in masterFasilitasKesehatan
            FILTER datax.masterFasilitasKesehatan ==  dataxx.id && datax.tahun == `+req.body.tahun+` `+cari_des_kel+` 

            for des_kelx in des_kel
            FILTER datax.des_kel == des_kelx.uniqid

            SORT datax.des_kel
            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id : datax.id,
                des_kel : datax.des_kel,
                tahun : datax.tahun,
                masterFasilitasKesehatan : datax.masterFasilitasKesehatan,
                jumlah :datax.jumlah,
                masterFasilitasKesehatan_uraian : dataxx.uraian,
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

router.post('/char_fasilitas_kesehatan', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& dataz.des_kel == '`+req.body.des_kel+`'`
    }
    
    var query = `
    for data in masterFasilitasKesehatan
    let datax = (
        for dataz in desa_fasilitasKesehatan
        filter data.id == dataz.masterFasilitasKesehatan
        filter dataz.tahun == `+req.body.tahun+` `+cari_des_kel+`  
        return TO_NUMBER(dataz.jumlah)
    
    )
    return {
        uraian : data.uraian,
        jumlah : SUM(datax)
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
        FOR data IN desa_fasilitasKesehatan
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
