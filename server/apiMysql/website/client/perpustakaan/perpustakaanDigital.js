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
        SELECT * FROM desa_dok_perpustakaan_digital;
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
        
        FOR jmlData in desa_dok_perpustakaan_digital
        FILTER jmlData.des_kel == '`+req.body.des_kel+`'
        FILTER jmlData.uraian LIKE '%`+ cari + `%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in desa_dok_perpustakaan_digital
            FILTER datax.des_kel == '`+req.body.des_kel+`'
            FILTER datax.uraian LIKE '%`+ cari + `%'

            SORT datax.id
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



// ============================== TAMBAHAN ====================================

router.post('/list', (req, res) => {

    var query = `
        FOR data IN desa_dok_perpustakaan_digital
        RETURN data
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });
})


router.post('/ViewOne', (req, res) => {
    console.log(req.body)

    var query = `
        FOR data IN desa_dok_perpustakaan_digital
        FILTER data.id == '`+req.body.id+`'
        RETURN data
    `
    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row[0])
        });
})





// ============================== TAMBAHAN ====================================


module.exports = router;
