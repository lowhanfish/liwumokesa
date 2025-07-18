const express = require('express');
var db = require('../../../../db/Arango/connections');


var multer=require("multer");
var upload = require('../../../../db/multer/pdf');

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

router.post('/addData', async (req,res)=>{

    var form = req.body.form;
    var pertanyaan = req.body.pertanyaan


    // console.log(form);



    var query = `
       FOR data in ipd_indikator_jawaban
       FILTER data.m_ipd_indikator == '`+form.id+`' && data.tahun == `+form.tahun+` &&  data.des_kel == '`+form.des_kel+`'
       RETURN data
    `
    db.query (query)
    .then(cursor => cursor.all())
    .then(async (row, err)=>{


        console.log(row.length);
        
        if (row.length <= 0) {
            await insertJawaban (form, pertanyaan, req, res)
        } else{
            await editJawaban (form, pertanyaan, req, res)
        }

        addJawaban (form, pertanyaan, req, res)
        
        res.send('row')

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


function addJawaban (form, pertanyaan, req, res){

        pertanyaan.forEach(element => {

            if (element.jawaban == null || element.jawaban == undefined || element.jawaban == '') {
            } else {


                
                
                var query = `
                FOR data in ipd_indikator_pertanyaan_jawaban
                FILTER data.m_ipd_indikator_pertanyaan == '`+element.id+`' && data.tahun == `+form.tahun+` &&  data.des_kel == '`+form.des_kel+`'
                RETURN data
                `
                db.query (query)
                .then(cursor => cursor.all())
                .then(async (row, err)=>{
                    
                    
                    console.log(row.length);
                    
                    if (row.length <= 0) {
                        await insertJawaban_pertanyaan (form, element, req, res)
                    } 
                    else{
                        await editJawaban_pertanyaan (form, element, req, res)
                    }


                });





            }

        });

}



async function insertJawaban (form, pertanyaan, req, res){
    console.log("DATA DISIMPAN");
    var data = {
        id : uniqid(),
        m_ipd_indikator : form.id,
        score : form.score,
        tahun : form.tahun,
        des_kel : form.des_kel
    }
    
    var reques = JSON.stringify(data)
    

    return new Promise((resolve, reject) => {
        var query = `
            insert `+reques+` into ipd_indikator_jawaban
        `
        db.query(query)
        .then(cursor => cursor.all())
        .then((row, err)=>{
            resolve (row)
        });
    })
}


async function editJawaban (form, pertanyaan, req, res){
    console.log("DATA DISIMPAN");
    var data = {
        id : uniqid(),
        m_ipd_indikator : form.id,
        score : form.score,
        tahun : form.tahun,
        des_kel : form.des_kel
    }
    var reques = JSON.stringify(data)
    return new Promise((resolve, reject) => {
        var query = `
            FOR i in ipd_indikator_jawaban
            FILTER i.m_ipd_indikator == '`+form.id+`' && i.tahun == `+form.tahun+` &&  i.des_kel == '`+form.des_kel+`'
            UPDATE i WITH `+reques+` IN ipd_indikator_jawaban
        `
        db.query(query)
        .then(cursor => cursor.all())
        .then((row, err)=>{
            resolve(row)
        });
    })
}



async function insertJawaban_pertanyaan (form, element, req, res){
    var data1 = {
        id : uniqid(),
        m_ipd_indikator_pertanyaan : element.id,
        m_ipd_indikator : element.m_ipd_indikator,
        jawaban : element.jawaban,
        tahun : form.tahun,
        des_kel : form.des_kel

    }

    var reques1 = JSON.stringify(data1)

    return new Promise((resolve, reject) => {
        
        var query1 = `
            insert `+reques1+` into ipd_indikator_pertanyaan_jawaban
        `
        db.query(query1)
            .then(cursor => cursor.all())
            .then((row1, err1)=>{
                resolve(row1)
        }); 
    })

}


async function editJawaban_pertanyaan (form, element, req, res){
    var data1 = {
        id : uniqid(),
        m_ipd_indikator_pertanyaan : element.id,
        m_ipd_indikator : element.m_ipd_indikator,
        jawaban : element.jawaban,
        tahun : form.tahun,
        des_kel : form.des_kel

    }

    var reques1 = JSON.stringify(data1)


    return new Promise((resolve, reject) => {
        var query = `
                FOR i in ipd_indikator_pertanyaan_jawaban
                FILTER i.m_ipd_indikator_pertanyaan == '`+element.id+`' && i.tahun == `+form.tahun+` &&  i.des_kel == '`+form.des_kel+`'
                UPDATE i WITH `+reques1+` IN ipd_indikator_pertanyaan_jawaban
            `
        db.query(query)
        .then(cursor => cursor.all())
        .then((row, err)=>{
            resolve(row)
        });
        
    })






}







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
