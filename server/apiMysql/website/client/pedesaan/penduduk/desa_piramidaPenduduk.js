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

// char_data_piramid_penduduk
router.post('/char_data_piramid_penduduk', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& datax2.des_kel == '`+req.body.des_kel+`'`
    } 
    var query = `
    let u0_6 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u0_6)
    )
    let u7_12 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u7_12)
    )
    let u13_19 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u13_19)
    )
    let xxxxx = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.xxxxx)
    )
    let u20_27 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u20_27)
    )
    let u28_35 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u28_35)
    )
    let u36_42 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u36_42)
    )
    let u43_50 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u43_50)
    )
    let u50_60 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u50_60)
    )
    
    let u60_keatas = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u60_keatas)
    )
    
    
    return {
    
        u0_6 : SUM(u0_6),
        u7_12 : SUM(u7_12),
        u13_19 : SUM(u13_19),
        u20_27 : SUM(u20_27),
        u28_35 : SUM(u28_35),
        u36_42 : SUM(u36_42),
        u43_50 : SUM(u43_50),
        u50_60 : SUM(u50_60),
        u60_keatas : SUM(u60_keatas)
    
    }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            
            res.send(
                    {
                        jumlah : [row[0].u0_6, row[0].u7_12, row[0].u13_19, row[0].u20_27, row[0].u28_35, row[0].u36_42, row[0].u43_50, row[0].u50_60, row[0].u60_keatas],
                        uraian : ["0-6", "7-12", "13-19", "20-27", "28-35", "36-42", "43-50", "50-60", ">6"]
                    }
                )
        });

});
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
