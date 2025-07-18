const express = require('express');

var db = require('../../../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM desa_statusSosial;
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
        
        FOR jmlData in desa_statusSosial
        FILTER jmlData.tahun == `+req.body.tahun+` `+cari_des_kel_jml+` 
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_statusSosial

            FOR des_kelx in des_kel
            FILTER des_kelx.uniqid == datax.des_kel
            
            FILTER datax.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            SORT datax.id
            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id:datax.id,
                kawin:datax.kawin,
                belum_kawin:datax.belum_kawin,
                janda_duda:datax.janda_duda,
                des_kel:datax.des_kel,
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

router.post('/char_data_status_sosial', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& datax2.des_kel == '`+req.body.des_kel+`'`
    }
    
 


    var query = `
    let kawin = (
        for datax2 in desa_statusSosial
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.kawin)
    )
    
    let belumkawin = (
        for datax2 in desa_statusSosial
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.belum_kawin)
    )
    
    let jandaduda = (
        for datax2 in desa_statusSosial
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.janda_duda)
    )
    
    return {
        kawin       : SUM(kawin),
        belum_kawin : SUM(belumkawin),
        janda_duda  : SUM(jandaduda)
    
    }
    
    `
    
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(
                {
                    jumlah : [row[0].kawin, row[0].belum_kawin, row[0].janda_duda],
                    uraian : ["Kawin", "Belum Kawin", "Janda Duda"]
                }
            )


        });

});

// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

    var query = `
        FOR data IN desa_statusSosial
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
