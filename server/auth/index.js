const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var uniqid = require('uniqid');
const dbx = require('../db/Arango/connections');

const router = express.Router();

const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(13).required(),
    password: Joi.string().min(6).required(),
});


router.get('/', (req, res) => {
    res.json({
        message: 'kiken-login'
    });
});


function respondError422(res, next, text){
    res.status(422);
    const error = new Error(text);
    next(error);
}

router.post('/login', (req, res, next) =>{

    const result = Joi.validate(req.body, schema);
    console.log("=========================");
    console.log(req.body.username);
    
    if (result.error === null) {


        var query = `
            FOR i IN users
                FILTER i.username == '`+req.body.username+`'
                RETURN i

        `


        dbx.query(query).then(
        cursor => cursor.all()
        ).then((row, err)=>{
            
            

            if(row.length <= 0) {
                respondError422(res, next, "Username Salah");
            }else{

                var user = {}
                for (var i in row) {user = row[i]}
                // res.send(user);

                const payload =  {
                    _id: user.id,
                    username : user.username,
                    profile : {
                        nama : user.nama,
                        alamat : user.alamat,
                        hp : user.hp,
                        email : user.email,
                        admin : user.admin,
                        relawan : user.relawan,
                        pendukung : user.pendukung,
                        level : user.level,
                        aksesWilayah : user.aksesWilayah,
                        des_kel : user.des_kel,
                        kecamatan : user.kecamatan,
                    }
                };
                
                console.log("Token_secret : ", process.env.TOKEN_SECRET);


                bcrypt.compare(req.body.password, user.password).then((result) => {

                    // console.log("SECREEEEET", )
                    // Jika client mengirimkan password yang benar
                    if(result){
                        jwt.sign(payload, process.env.TOKEN_SECRET, {
                            expiresIn: '24h'
                        }, (err, token) => {
                            if(err){
                                respondError422(res, next, "Kesalahan dlm pembuatan token");
                            }else{
                                res.json({
                                    token,
                                    profile : payload
                                });
                            }
                        })
                    }else{
                        respondError422(res, next, "Password salah");
                    }
                });


            }



        });






    }else{
        respondError422(res, next, "Gagal Login Periksa kembali username atau password anda..!");
    }
});



module.exports = router;