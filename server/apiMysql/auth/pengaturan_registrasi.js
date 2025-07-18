const express = require('express');
// var dbs = require('../../../db/MySql/daftaronline');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db/Arango/connections');
// const users = db.get('users');
// const pegawai = db.get('pegawai');
var uniqid = require('uniqid');



const router = express.Router();


router.post('/aa', (req, res) => {

    console.log(req.body)




    res.send('oke')







    // let query = `
    //     SELECT
    //     master_prodi.*
    //     FROM master_prodi
       
    // `
    // db.query(query, (err, row)=>{
    //     if (err) {
    //         res.json(err)
    //     }else{
    //         res.json(row)
    //     }
    // })
});



router.post('/view', (req, res) => {

    // console.log("SEGEEEEEEEEEEEEEEEEEEEEEEEEEXXXX")
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke)* data_batas;
    var cari = req.body.cari_value;
    if (data_star <0) {data_star = 0} 


    console.log(req.body)


    var query = `
        
        FOR jmlData in users
        FILTER jmlData.nama LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR i in users
            FILTER i.nama LIKE '%`+cari+`%'
            SORT i.createdAt
            LIMIT `+data_star+`, `+data_batas+`
            
            for j in levelUsers
            filter i.level == j._id



            return {
                nama : i.nama,
                _id : i._id,
                id : i.id,
                username : i.username,
                level : i.level,
                kelasAdmin : i.kelasAdmin,
                level_uraian : j.uraian,
                email : i.email,
                hp : i.hp
                
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





router.post('/signup', (req, res, next) => {

    console.log(req.body)

    const request = {
        username : req.body.username,
        password : req.body.password,
    }

    const result = Joi.validate(request, schema);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    if (result.error === null) {

 
        let view = `
            for data in users
            filter data.username == '`+req.body.username+`' || data.email == '`+req.body.email+`'
            return data
        `

        db.query(view)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if(row.length <= 0) {



                bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {

                    const data = {
                        id : uniqid(),
                        email : req.body.email,
                        level : req.body.level,
                        nama : req.body.nama,
                        hp : req.body.hp,
                        username : req.body.username,
                        password : hashedPassword,
                        aksesWilayah : req.body.aksesWilayah,
                        des_kel : req.body.des_kel,
                        kecamatan : req.body.kecamatan,
                    }
                    var reques = JSON.stringify(data)

                    let insert = `insert `+reques+` into users`

                    db.query(insert)
                    .then(cursor => cursor.all())
                    .then((row, err)=>{
                        if(err) {
                            console.log(err)
                            res.send('Gagal dalam meregistrasi ');
                        }else{
                            console.log('suksesssssssssssssssss')
                            res.send(row);
                        }
                    });

                });


            } else {
                const error = new Error('Username atau email sudah digunakan sebelumnya');
                res.status(409);
                next(error);
            }
        });


    } else {
        res.status(422);
        next(result.error);
    }
});




router.post('/editData', (req,res)=>{
    console.log(req.body)
    var reques = JSON.stringify(req.body)
    console.log(reques)
    var query = `
        FOR i in users
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN users
    `

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


    // console.log(req.body);


    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
})


router.post('/removeData', (req, res)=> {
    console.log(req.body)
    var query = `
        DELETE FROM users WHERE id = '`+req.body.id+`';
    `;
    dbs.query(query, (err, row)=>{
        if(err){
            console.log(er)
            res.send(err);
        }else{

            res.send(row);
        }
    });
})



const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(14).required(),
    password: Joi.string().min(6).required(),
});



module.exports = router;