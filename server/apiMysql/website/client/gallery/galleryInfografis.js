const express = require('express');
// var db = require('../../../../db/Arango/connections');

var db = require('../../../../db/Arango/connections');

var multer = require("multer");
var upload = require('../../../../db/multer/pdf');
var IMAGE = require('../../../../library/image');

var uniqid = require('uniqid');
const sharp = require('sharp');


const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM infografis;
    `;
    db.query(view, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);
        }
    })
});

router.post('/view', (req, res) => {

    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke) * data_batas;
    var cari = req.body.cari_value;
    if (data_star < 0) { data_star = 0 }


    var query = `
        
        FOR jmlData in infografis
        FILTER jmlData.des_kel == '`+req.body.des_kel+`'
        FILTER jmlData.judul LIKE '%`+ cari + `%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in infografis
            FILTER datax.des_kel == '`+req.body.des_kel+`'
            FILTER datax.judul LIKE '%`+ cari + `%'

            SORT datax.id desc
            LIMIT `+ data_star + `, ` + data_batas + `
            RETURN datax
        )

        return {
            data : data,
            jmlData : CEIL(length/`+ data_batas + `)
        }
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err)
            } else {
                console.log(row[0].data)
            res.send(row[0])
            }
        });



});

router.post('/list', (req, res) => {

    console.log('INFOGRAFIS DARI WEB TERPANGGIL')
    console.log(req.body)

    var query = `
        FOR data IN infografis
        FILTER data.des_kel == '`+req.body.des_kel+`'
        LIMIT 8
        RETURN data
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });
})

router.get('/list', (req, res) => {

    var query = `
        FOR data IN infografis
        LIMIT 8
        RETURN data
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });
})


router.get('/list6', (req, res) => {

    var query = `
        FOR data IN infografis
        LIMIT 6
        RETURN data
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });
})

router.post('/list6', (req, res) => {

    var query = `
        FOR data IN infografis
        FILTER data.des_kel == '`+req.body.des_kel+`'
        LIMIT 6
        RETURN data
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });
})







// ============================== TAMBAHAN ====================================


module.exports = router;
