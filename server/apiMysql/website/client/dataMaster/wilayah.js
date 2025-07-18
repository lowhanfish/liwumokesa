const express = require('express');
var db = require('../../../../db/Arango/connections');

const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM wilayah;
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
        
        FOR jmlData in wilayah
        FILTER jmlData.uraian LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in wilayah
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

// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

    var query = `
        FOR data IN wilayah
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
