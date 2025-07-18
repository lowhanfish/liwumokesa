const express = require('express');
var db = require('../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.post('/view', (req, res) => {
 
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke)* data_batas;
    var cari = req.body.cari_value;
    if (data_star <0) {data_star = 0} 


    console.log(req.body)


    var query = `
        
        FOR jmlData in des_kel
        FILTER jmlData.uraian LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR i in des_kel
            FILTER i.uraian LIKE '%`+cari+`%'
            SORT i.createdAt
            LIMIT `+data_star+`, `+data_batas+`

            FOR j in kecamatan
            filter j.id == i.kecamatan

            FOR k in kab_kota
            filter k.id == i.kab_kota

            FOR l in wilayah
            filter l.id == j.wilayah



            return {
                des_kel : i,
                kecamatan : j,
                kab_kota : k,
                wilayah : l
            
            }
        )

        return {
            data : data,
            jmlData : CEIL(length/`+data_batas+`),
            length : length
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
        insert `+reques+` into des_kel
    `

    // console.log(query)
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData',(req, res) => {
    var reques = JSON.stringify(req.body)
    console.log(reques)
    var query = `
        FOR i in des_kel
        FILTER i.uniqid == '`+req.body.uniqid+`'
        UPDATE i WITH `+reques+` IN des_kel
    `

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})


router.post('/removeData', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN des_kel
        filter data.uniqid == '`+req.body.uniqid+`'
        REMOVE data IN des_kel
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})

router.post('/list', (req, res)=> {

    // console.log(req.user.profile.aksesWilayah)

    var filter_kecamatan = ''

    if (req.body.kecamatan == null || req.body.kecamatan == undefined || req.body.kecamatan == '') {
        filter_kecamatan = ''
    } else {
        filter_kecamatan = `FILTER data.kecamatan == '`+req.body.kecamatan+`'`
    }


    // console.log('AAAAAAAAAAAAAAAAA')
    var query = `
        FOR data IN des_kel
        `+filter_kecamatan+`
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})



// profile: {
//     nama: 'Kiken Sukma Batara',
//     hp: '085241766456',
//     email: 'lowhanfish@gmail.com',
//     level: 'levelUsers/1206129',
//     aksesWilayah: 2,
//     des_kel: null,
//     kecamatan: null
//   },


router.get('/list', (req, res)=> {
    // console.log('BBBBBBBBBBBBBBBBB')
    console.log(req.user.profile.aksesWilayah)
    var query = `
        FOR data IN des_kel
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})


router.post('/list_terbatas', (req, res)=> {
    // console.log('BBBBBBBBBBBBBBBBB')
    console.log(req.user.profile.aksesWilayah)
    var query = `
        FOR data IN des_kel
        RETURN {
            uraian : data.uraian,
            wilayah : data.wilayah,
            kab_kota : data.kab_kota,
            kecamatan : data.kecamatan,
            nama_kecamatan : data.nama_kecamatan,
            uniqid : data.uniqid,
            createdAt : data.createdAt,
            alamat : data.alamat
        }
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})



router.get('/listAkses', (req, res)=> {
    // console.log('BBBBBBBBBBBBBBBBB')
    console.log(req.user.profile.aksesWilayah)
    var query = `
        FOR data IN des_kel
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})


router.post('/autoComplete', (req, res)=> {
    // console.log(req.body)
    var filter = ''
    if (req.body.uraian == null || req.body.uraian == undefined || req.body.uraian == '') {
        filter = ``
    } else {
        filter = `FILTER LOWER(data.uraian) LIKE '%`+req.body.uraian+`%'`
    }


    var query = `
        FOR data IN des_kel
        `+filter+`
        LIMIT 20
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})



router.post('/PostList', (req, res)=> {
    console.log(req.body)
    console.log("AAAAAAAAAAA")
    var filter = ''
    if (req.body.uraian == null || req.body.uraian == undefined || req.body.uraian == '') {
        filter = ``
    } else {
        filter = `filter data.kecamatan == '`+req.body.uraian+`'`
    }


    var query = `
        FOR data IN des_kel
        `+filter+`
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})






module.exports = router;
