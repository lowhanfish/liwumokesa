const express = require('express');
var db = require('../../../../db/Arango/connections');

const router = express.Router();

router.post('/view', (req, res) => {
 
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke)* data_batas;
    var cari = req.body.cari_value;
    if (data_star <0) {data_star = 0} 


    console.log(req.body)


    var query = `
        
        FOR jmlData in kab_kota
        FILTER jmlData.uraian LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR i in kab_kota
            FILTER i.uraian LIKE '%`+cari+`%'
            SORT i.createdAt
            LIMIT `+data_star+`, `+data_batas+`

            FOR j in wilayah
            filter j.id == i.wilayah



            return {
                kab_kota : i,
                wilayah : j
            
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


// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

    var query = `
        FOR data IN kab_kota
        filter data.wilayah == '`+req.body.wilayah+`'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})


router.get('/autocomplete', (req, res)=> {
    console.log(req.query.q)
    var query = `
        FOR data IN kab_kota
        filter LOWER(data.uraian) LIKE '%`+req.query.q+`%'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        console.log(row)
        res.send(row)
    });
})





// ============================== TAMBAHAN ====================================




module.exports = router;
