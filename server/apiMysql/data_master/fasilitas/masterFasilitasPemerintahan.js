const express = require('express');
var db = require('../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        for data in masterFasilitasPemerintahan
        return data
    `;
    db.query(view)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
});


router.post('/', (req, res) => {
    console.log(req.body)
    let view = `
    for data in masterFasilitasPemerintahan
    let check = (
        for datax in desa_fasilitasPemerintahan
        filter datax.masterFasilitasPemerintahan == data.id && datax.des_kel == '`+req.body.des_kel+`' && datax.tahun == `+req.body.tahun+`
        COLLECT WITH COUNT INTO length
        RETURN length
    )

    filter check[0] <= 0
    
    return ({
        id : data.id,
        uraian : data.uraian,
        createdAt : data.createdAt
    })



    `;
    db.query(view)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        row.forEach(element => {
           console.log(element) 
        });
        res.send(row)
    });
});

router.post('/view', (req, res) => {
 
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke)* data_batas;
    var cari = req.body.cari_value;
    if (data_star <0) {data_star = 0} 


    var query = `
        
        FOR jmlData in masterFasilitasPemerintahan
        FILTER jmlData.uraian LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in masterFasilitasPemerintahan
            FILTER datax.uraian LIKE '%`+cari+`%'
            SORT datax.id
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
        insert `+reques+` into masterFasilitasPemerintahan
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
        FOR i in masterFasilitasPemerintahan
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN masterFasilitasPemerintahan
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
        FOR data IN masterFasilitasPemerintahan
        filter data.id == '`+req.body.id+`'
        REMOVE data IN masterFasilitasPemerintahan
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
        FOR data IN masterFasilitasPemerintahan
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
