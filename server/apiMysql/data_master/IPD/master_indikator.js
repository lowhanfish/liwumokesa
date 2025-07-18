const express = require('express');
var db = require('../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM m_ipd_indikator;
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
        
        FOR jmlData in m_ipd_indikator
        FILTER jmlData.uraian LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in m_ipd_indikator
            FILTER datax.uraian LIKE '%`+cari+`%'

            FOR variabel in m_ipd_variabel
            FILTER datax.m_ipd_variabel == variabel.id

            FOR dimensi in m_ipd_dimensi
            FILTER variabel.m_ipd_dimensi == dimensi.id



            let pertanyaan = (
                for ipd_indikator_pertanyaan in m_ipd_indikator_pertanyaan
                FILTER datax.id == ipd_indikator_pertanyaan.m_ipd_indikator
                COLLECT WITH COUNT INTO length1
                return length1
            )


            SORT datax.id DESC

            LIMIT `+data_star+`, `+data_batas+`
            RETURN {
                id : datax.id,
                m_ipd_variabel : datax.m_ipd_variabel,
                uraian : datax.uraian,
                keterangan: datax.keterangan,
                createdAt : datax.createdAt,

                uraian_variabel : variabel.uraian,
                uraian_dimensi : dimensi.uraian,
                jml_pertanyaan : pertanyaan[0]
            }
        )

        return {
            data : data,
            jmlData : CEIL(length/`+data_batas+`)
        }
    `


    console.log(query);
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row[0])
    });



});


router.post('/addData', (req,res)=>{
    var reques = JSON.stringify(req.body)
    var query = `
        insert `+reques+` into m_ipd_indikator
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
        FOR i in m_ipd_indikator
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_ipd_indikator
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
        FOR data IN m_ipd_indikator
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_ipd_indikator
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})










router.post('/view_pertanyaan', (req, res) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(req.body);

    var filter_deskel = ''

    if (req.body.des_kel == null || req.body.des_kel == undefined || req.body.des_kel == '') {
        filter_deskel = ''
    } else {
        filter_deskel = `&& jawaban.des_kel == '`+req.body.des_kel+`'`
    }



    var query = `
        
        FOR data in m_ipd_indikator_pertanyaan
        FILTER data.m_ipd_indikator == '`+req.body.m_ipd_indikator+`'

        let jawab = (
            FOR jawaban in ipd_indikator_pertanyaan_jawaban


            FILTER 
            jawaban.m_ipd_indikator_pertanyaan == data.id && 
            jawaban.tahun == `+ req.body.tahun +` 
           `+filter_deskel+`


            return {
                jawaban : jawaban.jawaban
            }
        )



        return {
            id : data.id,
            m_ipd_indikator : data.m_ipd_indikator,
            uraian : data.uraian,
            createdAt : data.createdAt,
            jawaban : jawab[0].jawaban
            
        }
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });



});

router.post('/addData_pertanyaan', (req,res)=>{
    var reques = JSON.stringify(req.body)
    var query = `
        insert `+reques+` into m_ipd_indikator_pertanyaan
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_pertanyaan',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in m_ipd_indikator_pertanyaan
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_ipd_indikator_pertanyaan
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


router.post('/removeData_pertanyaan', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_ipd_indikator_pertanyaan
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_ipd_indikator_pertanyaan
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})




router.post('/list_indikator', (req, res)=> {

    var query = `
        FOR datax in m_ipd_indikator

        FOR variabel in m_ipd_variabel
        FILTER datax.m_ipd_variabel == variabel.id

        FOR dimensi in m_ipd_dimensi
        FILTER variabel.m_ipd_dimensi == dimensi.id


        let jawab = (
            FOR jawaban in ipd_indikator_jawaban
            FILTER 
            jawaban.m_ipd_indikator == datax.id && 
            jawaban.tahun == `+req.body.tahun+` &&
            jawaban.des_kel == '`+req.body.des_kel+`'


            return jawaban
        )


        let pertanyaan = (
            for ipd_indikator_pertanyaan in m_ipd_indikator_pertanyaan
            FILTER datax.id == ipd_indikator_pertanyaan.m_ipd_indikator
            COLLECT WITH COUNT INTO length1
            return length1
        )


        SORT datax.id ASC

        RETURN {
            id : datax.id,
            m_ipd_variabel : datax.m_ipd_variabel,
            uraian : datax.uraian,
            score : jawab[0].score,
            status : jawab[0].status,
            keterangan: datax.keterangan,
            createdAt : datax.createdAt,

            uraian_variabel : variabel.uraian,
            uraian_dimensi : dimensi.uraian,
            jml_pertanyaan : pertanyaan[0]
        }
    
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})




router.post('/list_pertanyaan', (req, res)=> {

    var query = `
        for data in m_ipd_dimensi

        let variabel = (
            for m_ipd_variabel in m_ipd_variabel
            FILTER data.id == m_ipd_variabel.m_ipd_dimensi
            
            let indikator = (
                for m_ipd_indikator in m_ipd_indikator
                FILTER m_ipd_variabel.id == m_ipd_indikator.m_ipd_variabel
        
                let pertanyaan = (
                    for m_ipd_indikator_pertanyaan in m_ipd_indikator_pertanyaan
                    FILTER m_ipd_indikator.id == m_ipd_indikator_pertanyaan.m_ipd_indikator
                    return m_ipd_indikator_pertanyaan
                )
        
                return {
                    id : m_ipd_indikator.id,
                    uraian : m_ipd_indikator.uraian,
                    keterangan : m_ipd_indikator.keterangan,
                    pertanyaan : pertanyaan
                }
            )
        
            return {
                id : m_ipd_variabel.id,
                uraian : m_ipd_variabel.uraian,
                indikator : indikator
            }
        )
    
        return 
        {
            id : data.id,
            uraian : data.uraian,
            variabel : variabel
        }
    
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})











// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

    var query = `
        FOR data IN m_ipd_indikator
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
