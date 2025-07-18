const express = require('express');
var db = require('../../../../db/Arango/connections');

const router = express.Router();



router.post('/list', (req, res)=> {

    var query = `
        FOR data IN des_kel
        filter data.kecamatan == '`+req.body.kecamatan+`'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})
router.get('/list', (req, res)=> {

    var query = `
        FOR data IN des_kel
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(row)
        }
    });
})
router.post('/getDesaByURL', (req, res)=> {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(req.body)
    var query = `
    for data in des_kel
    FILTER data.url == '`+req.body.url+`'
    
    for kecamatan in kecamatan
    FILTER data.kecamatan == kecamatan.id
    
    
    
    return {
        id_desa : data.uniqid,
        desa : data.uraian,
        visitor : data.visitor,
        kecamatan : kecamatan.uraian,
        url : data.uraian
    }
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{


        res.send(row)
    });
})

module.exports = router;