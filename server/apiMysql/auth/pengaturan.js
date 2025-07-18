const express = require('express');
var dbs = require('../../../db/MySql/daftaronline');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const db = require('../db/connection');
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









router.post('/', (req, res) =>{

   


        let view = ` 
            SELECT 
                users.*
            FROM users 
            WHERE username = '`+req.body.username+`';
        `;

        dbs.query(view, (err, row)=>{

            if(row.length <= 0) {
                res.json("Username Tidak Ditemukan")
            }else{


                bcrypt.compare(req.body.pass_lama, row[0].password).then((result) => {
                    console.log(result)
                    // Jika client mengirimkan password yang benar
                    if(result){


                        // console.log('pass sama')

                        // res.send('OK')



                        bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {

                            const email = req.body.email;
                            const hp = req.body.hp;
                            const password = hashedPassword;

        
                            let insert = `
                            UPDATE users SET
                            email = '`+email+`',
                            hp = '`+hp+`',
                            password = '`+password+`'
                        
                            WHERE id = '`+req.user._id+`'
                            `;
        
                            dbs.query(insert, (err, row)=>{
                                if(err) {
                                    console.log(err)
                                    res.json('Perubahan Gagal');
                                }else{
                                    res.json('Sukses');
                                }
                            })
        
                        });









                        
                    }else{
                        res.json('Password Lama Salah')
                    }
                });

  
            }
        })

  


});



module.exports = router;