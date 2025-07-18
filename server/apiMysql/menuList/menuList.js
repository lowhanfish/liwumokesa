const express = require('express');
var db = require('../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM menu_list;
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
        FOR data in menu_list
        filter data.kategori == 'menu'
        
        let data1 = (
            FOR data1 in menu_list
            filter data1.kategori == 'submenu' && data1.menu == data._id
            
            let data2 = (
                FOR data2 in menu_list
                filter data2.kategori == 'subsubmenu' && data2.menu == data1._id
                return data2
            )
        
            
            return merge(data1, {submenu:data2})
        )


        SORT TO_NUMBER(data.index)
        
        
    return merge(data, {submenu:data1})
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
        insert `+reques+` into menu_list
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
        FOR i in menu_list
        FILTER i._id == '`+req.body._id+`'
        UPDATE i WITH `+reques+` IN menu_list
    `

    // console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})


router.post('/removeData', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN menu_list
        filter data._id == '`+req.body._id+`'
        REMOVE data IN menu_list
    `

    // console.log(req.body)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})

// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

    var query = `
        FOR data IN menu_list
        SORT TO_NUMBER(data.index)
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
