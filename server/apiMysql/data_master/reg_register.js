const express = require('express');
var db = require('../../db/MySql/office');

var multer=require("multer");
var upload = require('../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();


// console.log(req.query.q);



router.get('/', (req, res) => {
    let view = `
        SELECT 
        users.*, 

        dpt.nama as nama,
        dpt.nik as nik,
        dpt.alamat as alamat

        FROM users
        JOIN dpt
        ON dpt.id = users.nama
        LIMIT 0,10;
       
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
    var data_batas = 10;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1; 

    let jml_data = `
        SELECT 
        users.*, 

        dpt.nama as nama,
        dpt.nik as nik,
        dpt.alamat as alamat

        FROM users
        JOIN dpt
        ON dpt.id = users.nama
        WHERE 
        dpt.nama LIKE '%`+cari+`%' 
        OR dpt.alamat LIKE '%`+cari+`%'
        ORDER BY dpt.tps DESC
    
    `

    let view = `
        SELECT 
        users.username, 
        users.email,
        users.hp,
        
        users.admin,
        users.relawan,
        users.pendukung,

        dpt.nama as nama,
        dpt.nik as nik,
        dpt.alamat as alamat

        FROM users
        JOIN dpt
        ON dpt.id = users.nama
        WHERE 
        dpt.nama LIKE '%`+cari+`%' 
        OR dpt.alamat LIKE '%`+cari+`%'
        ORDER BY dpt.tps DESC
        LIMIT `+data_star+`,`+data_batas+`
    `;
    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
                else{
                    halaman = Math.ceil(row.length/data_batas);
                    if(halaman<1){halaman = 1}
                    res.json({
                        data : result,
                        jml_data : halaman
                    })
                }
            })
            // ========================

        }
    })
});



router.post('/getByTps', (req, res) => {
    let view = `SELECT COUNT(*) as count FROM dpt where tps = '`+req.body.id_tps+`' `;
    db.query(view, (err, result)=>{
        if (err) {res.json(err)}
        else{
            res.json(result[0].count);
            // console.log(result[0].count);
            
        }
    })

});

router.post('/addData', (req,res)=>{
    let insert = `INSERT INTO tps (des_kel, alamat, rt, rw, tps) 
    VALUES 
    (
        '`+req.body.des_kel+`',
        '`+req.body.alamat+`',
        '`+req.body.rt+`',
        '`+req.body.rw+`',
        '`+req.body.tps+`'
    );`

    db.query(insert, (err, row)=>{
        if(err) {
            res.send(err);
        }else{
            res.send(row);
        }
    })
});

router.post('/editData',(req, res) => {
    var update = `
        UPDATE tps SET
        des_kel = '`+req.body.des_kel+`',
        alamat = '`+req.body.alamat+`',
        rt = '`+req.body.rt+`',
        rw = '`+req.body.rw+`',
        tps = '`+req.body.tps+`'
        WHERE id = '`+req.body.id+`'
    `;

    db.query(update, (err, row)=>{
        if(err) {
            res.send(err);
        }else{
            res.send(row);
        }
    })
})


router.post('/removeData', (req, res)=> {
    var query = `
        DELETE FROM tps WHERE id = '`+req.body.id+`'; 
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})




module.exports = router;
