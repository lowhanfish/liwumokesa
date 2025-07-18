const express = require('express');
var db = require('../../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();



router.post('/view_bumdes', (req, res) => {

    console.log(req.body)
 
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


    console.log(cari_des_kel)
    console.log(jmlData_des_kel)


    var query = `
        
        FOR jmlData in m_kelembagaan_bumdes

        for jmlDes_kel in des_kel
        filter jmlDes_kel.uniqid == jmlData.des_kel

        for jmlKec in kecamatan
        filter jmlKec.id == jmlDes_kel.kecamatan

        `+jmlData_kecamatan+`
        `+jmlData_des_kel+`
        FILTER jmlData.uraian LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in m_kelembagaan_bumdes

            for des_kel in des_kel
            filter des_kel.uniqid == datax.des_kel

            for kec in kecamatan
            filter kec.id == des_kel.kecamatan


            `+cari_kecamatan+`
            `+cari_des_kel+`
            FILTER datax.uraian LIKE '%`+cari+`%'
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

router.post('/view_pelaops', (req, res) => {
    var query = `
        FOR data in m_pelaksana_operasi
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        FOR pendidikan in masterPendidikan
        FILTER pendidikan.id == data.pendidikan_terahir


        RETURN {
            id : data.id,
            id_bumDes : data.id_bumDes,
            nama : data.nama,
            jabatan : data.jabatan,
            alamat : data.alamat,
            pendidikan_terahir : data.pendidikan_terahir,
            no_telp : data.no_telp,
            honor : data.honor,
            createdAt : data.createdAt,
            des_kel : data.des_kel,
            pendidikan_uraian : pendidikan.uraian
        }
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/view_kops', (req, res) => {
    var query = `
        FOR data in m_kendaraan_operasional
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/view_pelatihan', (req, res) => {
    var query = `
        FOR data in m_pelatihan
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/view_sarProd', (req, res) => {
    var query = `
        FOR data in m_jenis_sarana_produksi
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/view_usahaKeuangan', (req, res) => {
    var query = `
        FOR data in m_usaha_dan_keuangan
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/view_keuangan_modal', (req, res) => {
    var query = `
        FOR data in m_adm_keuangan_modal
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/view_keuangan_laporan', (req, res) => {
    var query = `
        FOR data in m_adm_keuangan_adm
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/view_keuangan_kerjaSama', (req, res) => {
    var query = `
        FOR data in m_adm_keuangan_kerjaSama
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/view_keuangan_pendampingan', (req, res) => {
    var query = `
        FOR data in m_adm_keuangan_pendampingan
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/view_keuangan_intensitas', (req, res) => {
    var query = `
        FOR data in m_adm_keuangan_intensitas
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});


// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

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
