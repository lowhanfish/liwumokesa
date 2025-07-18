const express = require('express');
var db = require('../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.body);
    let view = `
        SELECT * FROM m_ipd_dimensi;
    `;
     db.query(view, (err, row)=>{
        if(err) {
            res.send(err);
        }else{
            res.send(row);
        }
    })
});


router.post('/', (req, res) => {
    console.log(req.body);
    let view = `
        SELECT * FROM m_ipd_dimensi;
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

    

    var query = `
        
        FOR data in m_ipd_dimensi

        return data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });



});

router.post('/addData', (req,res)=>{
    var reques = JSON.stringify(req.body)
    var query = `
        insert `+reques+` into m_ipd_dimensi
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
        FOR i in m_ipd_dimensi
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_ipd_dimensi
    `

    // console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err)
        } else {
            res.send('ok')
        }
    });
})


router.post('/removeData', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_ipd_dimensi
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_ipd_dimensi
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


    // console.log(req.body);
    // console.log('xxxxxxxxxxxxxxxxxxx');
    var query = `
        FOR data IN m_ipd_dimensi
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.json(row)
    });
})

// ============================== TAMBAHAN ====================================


module.exports = router;
