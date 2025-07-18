const express = require('express');
var db = require('../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();


const menuList = require('../../library/listMenu')

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM levelUsers;
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
 
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke)* data_batas;
    var cari = req.body.cari_value;
    if (data_star <0) {data_star = 0} 


    var query = `
        for data in levelUsers
        return data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });



});

router.post('/addData', (req,res)=>{
    // console.log(req.body)

    var data = req.body

    console.log(data)


    var reques = JSON.stringify(req.body)
    var query = `
        insert `+reques+` into levelUsers
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });

    // res.send('OK')


});

router.post('/editData',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(req.body)
    var query = `
        FOR i in levelUsers
        FILTER i._id == '`+req.body._id+`'
        UPDATE i WITH `+reques+` IN levelUsers
    `

    // console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})


router.post('/removeData', (req, res)=> {
    console.log(req.body)
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN levelUsers
        filter data._id == '`+req.body._id+`'
        REMOVE data IN levelUsers
    `

    console.log(req.body)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})

// ============================== TAMBAHAN ====================================

router.get('/list', (req, res)=> {
    console.log(req.body)
    var query = `
        FOR data IN levelUsers
        RETURN ({
            _id : data._id,
            uraian : data.uraian
        })
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})



router.post('/list', (req, res)=> {
    menuList.menu(db, req, res);
})








// ============================== TAMBAHAN ====================================


module.exports = router;
