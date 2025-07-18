const express = require('express');
var db = require('../../../../db/Arango/connections');

var multer=require("multer");
var upload = require('../../../../db/multer/pdf');

var IMAGE = require('../../../../library/image');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM m_kelembagaan_bumdes;
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

    console.log(req.body)
 
    var data_ke = req.body.data_ke - 1
    var data_batas = req.body.page_limit;
    var data_star = (data_ke)* data_batas;
    var cari = req.body.cari_value;
    if (data_star <0) {data_star = 0} 




    var cari_kecamatan = ''
    var jmlData_kecamatan = ''
    var cari_des_kel = ''
    var jmlData_des_kel = ''

    if (req.body.kecamatan == undefined || req.body.kecamatan == null || req.body.kecamatan == false || req.body.kecamatan== '') {

        if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
            cari_des_kel = ''
            jmlData_des_kel = ''
        }else{
            cari_des_kel = `FILTER datax.des_kel == '`+req.body.des_kel+`'`
            jmlData_des_kel = `FILTER jmlData.des_kel == '`+req.body.des_kel+`'`
        }

    } else {

        if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
            cari_kecamatan = `FILTER  kec.id == "`+req.body.kecamatan+`"`
            jmlData_kecamatan = `FILTER  jmlKec.id == "`+req.body.kecamatan+`"`
            cari_des_kel = ''
            jmlData_des_kel = ''
        }else{
            cari_kecamatan = `FILTER  kec.id == "`+req.body.kecamatan+`"`
            jmlData_kecamatan = `FILTER  jmlKec.id == "`+req.body.kecamatan+`"`
            
            cari_des_kel = `FILTER datax.des_kel == '`+req.body.des_kel+`'`
            jmlData_des_kel = `FILTER jmlData.des_kel == '`+req.body.des_kel+`'`
        }

    }


    console.log(cari_des_kel)
    console.log(jmlData_des_kel)


    var query = `
        
        FOR jmlData in m_kelembagaan_bumdes

        for jmlDes_kel in des_kel
        filter jmlDes_kel.uniqid == jmlData.des_kel

        for jmlKec in kecamatan
        filter jmlKec.id == jmlDes_kel.kecamatan

        `+jmlData_kecamatan+`
        `+jmlData_des_kel+`
        FILTER jmlData.uraian LIKE '%`+cari+`%'
        COLLECT WITH COUNT INTO length

        let data = (
            FOR datax in m_kelembagaan_bumdes

            for des_kel in des_kel
            filter des_kel.uniqid == datax.des_kel

            for kec in kecamatan
            filter kec.id == des_kel.kecamatan


            `+cari_kecamatan+`
            `+cari_des_kel+`
            FILTER datax.uraian LIKE '%`+cari+`%'
            SORT datax._key DESC
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

router.post('/addData', (req,res)=>{
    var reques = JSON.stringify(req.body)
    console.log(reques);
    var query = `
        insert `+reques+` into m_kelembagaan_bumdes
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
        FOR i in m_kelembagaan_bumdes
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_kelembagaan_bumdes
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
        FOR data IN m_kelembagaan_bumdes
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_kelembagaan_bumdes
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})

// ============================== TAMBAHAN ====================================

router.post('/list', (req, res)=> {

    var query = `
        FOR data IN m_kelembagaan_bumdes
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send(row)
    });
})

// ============================== TAMBAHAN ====================================










// ============================== PELAKSANA OPERASI ====================================
router.post('/view_pelaops', (req, res) => {
    var query = `
        FOR data in m_pelaksana_operasi
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        FOR pendidikan in masterPendidikan
        FILTER pendidikan.id == data.pendidikan_terahir


        RETURN {
            id : data.id,
            id_bumDes : data.id_bumDes,
            nama : data.nama,
            jabatan : data.jabatan,
            alamat : data.alamat,
            pendidikan_terahir : data.pendidikan_terahir,
            no_telp : data.no_telp,
            honor : data.honor,
            createdAt : data.createdAt,
            des_kel : data.des_kel,
            pendidikan_uraian : pendidikan.uraian
        }
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/addData_pelaops', (req,res)=>{
    var reques = JSON.stringify(req.body)
    console.log(reques);
    var query = `
        insert `+reques+` into m_pelaksana_operasi
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_pelaops',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in m_pelaksana_operasi
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_pelaksana_operasi
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


router.post('/removeData_pelaops', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_pelaksana_operasi
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_pelaksana_operasi
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})
// ============================== PELAKSANA OPERASI ====================================




// ============================== KENDARAAN OPERASIONAL ====================================
router.post('/view_kops', (req, res) => {
    var query = `
        FOR data in m_kendaraan_operasional
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/addData_kops', (req,res)=>{
    var reques = JSON.stringify(req.body)
    console.log(reques);
    var query = `
        insert `+reques+` into m_kendaraan_operasional
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_kops',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in m_kendaraan_operasional
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_kendaraan_operasional
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


router.post('/removeData_kops', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_kendaraan_operasional
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_kendaraan_operasional
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})
// ============================== KENDARAAN OPERASIONAL ====================================



// ============================== PELATIHAN ====================================
router.post('/view_pelatihan', (req, res) => {
    var query = `
        FOR data in m_pelatihan
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/addData_pelatihan', (req,res)=>{
    var reques = JSON.stringify(req.body)
    console.log(reques);
    var query = `
        insert `+reques+` into m_pelatihan
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_pelatihan',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in m_pelatihan
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_pelatihan
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


router.post('/removeData_pelatihan', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_pelatihan
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_pelatihan
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})
// ============================== PELATIHAN ====================================



// ============================== SARANA PRODUKSI ====================================
router.post('/view_sarProd', (req, res) => {
    var query = `
        FOR data in m_jenis_sarana_produksi
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/addData_sarProd', (req,res)=>{
    var reques = JSON.stringify(req.body)
    console.log(reques);
    var query = `
        insert `+reques+` into m_jenis_sarana_produksi
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_sarProd',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in m_jenis_sarana_produksi
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_jenis_sarana_produksi
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


router.post('/removeData_sarProd', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_jenis_sarana_produksi
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_jenis_sarana_produksi
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})
// ============================== SARANA PRODUKSI ====================================


// ============================== USAHA DAN KEUANGAN ====================================
router.post('/view_usahaKeuangan', (req, res) => {
    var query = `
        FOR data in m_usaha_dan_keuangan
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/addData_usahaKeuangan', upload.single("file"), (req, res) => {

    var data = req.body;
    data.file = req.file.filename;
    data.createdBy = req.user.username;


    var reques = JSON.stringify(data)

    console.log(reques);
    var query = `
        insert `+reques+` into m_usaha_dan_keuangan
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_usahaKeuangan', upload.single("file"), (req, res) => {

    var data = req.body;
    console.log(data.id)

    if (req.file == undefined || req.file == null || req.file == '') {
        delete data.file;
        console.log('File Kosong')
    } else {
        IMAGE.hapus_file(req.body.fileOld);
        data.file = req.file.filename;
        console.log('tidak kosoooooooooooooooooong');
    }


    var reques = JSON.stringify(data);
    // console.log(reques)
    var query = `
        FOR i in m_usaha_dan_keuangan
        FILTER i.id == '`+data.id+`'
        UPDATE i WITH `+reques+` IN m_usaha_dan_keuangan
    `

    console.log(query)

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


router.post('/removeData_usahaKeuangan', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_usaha_dan_keuangan
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_usaha_dan_keuangan
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        IMAGE.hapus_file(req.body.fileOld);
        res.send('ok')
    });
})
// ============================== USAHA DAN KEUANGAN ====================================


// ============================== KEUANGAN MODAL ====================================
router.post('/view_keuangan_modal', (req, res) => {
    var query = `
        FOR data in m_adm_keuangan_modal
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/addData_keuangan_modal', (req,res)=>{
    var reques = JSON.stringify(req.body)
    console.log(reques);
    var query = `
        insert `+reques+` into m_adm_keuangan_modal
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_keuangan_modal',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in m_adm_keuangan_modal
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_adm_keuangan_modal
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


router.post('/removeData_keuangan_modal', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_adm_keuangan_modal
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_adm_keuangan_modal
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})
// ============================== KEUANGAN MODAL ====================================



// ============================== KEUANGAN LAPORAN ====================================
router.post('/view_keuangan_laporan', (req, res) => {
    var query = `
        FOR data in m_adm_keuangan_adm
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/addData_keuangan_laporan', upload.single("file"), (req, res) => {

    var data = req.body;
    data.file = req.file.filename;
    data.createdBy = req.user.username;


    var reques = JSON.stringify(data)

    console.log(reques);
    var query = `
        insert `+reques+` into m_adm_keuangan_adm
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_keuangan_laporan', upload.single("file"), (req, res) => {

    var data = req.body;
    console.log(data.id)

    if (req.file == undefined || req.file == null || req.file == '') {
        delete data.file;
        console.log('File Kosong')
    } else {
        IMAGE.hapus_file(req.body.fileOld);
        data.file = req.file.filename;
        console.log('tidak kosoooooooooooooooooong');
    }


    var reques = JSON.stringify(data);
    // console.log(reques)
    var query = `
        FOR i in m_adm_keuangan_adm
        FILTER i.id == '`+data.id+`'
        UPDATE i WITH `+reques+` IN m_adm_keuangan_adm
    `

    console.log(query)

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


router.post('/removeData_keuangan_laporan', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_adm_keuangan_adm
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_adm_keuangan_adm
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        IMAGE.hapus_file(req.body.fileOld);
        res.send('ok')
    });
})
// ============================== KEUANGAN LAPORAN ====================================




// ============================== KEUANGAN KERJA SAMA ====================================
router.post('/view_keuangan_kerjaSama', (req, res) => {
    var query = `
        FOR data in m_adm_keuangan_kerjaSama
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'
        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/addData_keuangan_kerjaSama', upload.single("file"), (req, res) => {

    var data = req.body;
    data.file = req.file.filename;
    data.createdBy = req.user.username;


    var reques = JSON.stringify(data)

    console.log(reques);
    var query = `
        insert `+reques+` into m_adm_keuangan_kerjaSama
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_keuangan_kerjaSama', upload.single("file"), (req, res) => {

    var data = req.body;
    console.log(data.id)

    if (req.file == undefined || req.file == null || req.file == '') {
        delete data.file;
        console.log('File Kosong')
    } else {
        IMAGE.hapus_file(req.body.fileOld);
        data.file = req.file.filename;
        console.log('tidak kosoooooooooooooooooong');
    }


    var reques = JSON.stringify(data);
    // console.log(reques)
    var query = `
        FOR i in m_adm_keuangan_kerjaSama
        FILTER i.id == '`+data.id+`'
        UPDATE i WITH `+reques+` IN m_adm_keuangan_kerjaSama
    `

    console.log(query)

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


router.post('/removeData_keuangan_kerjaSama', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_adm_keuangan_kerjaSama
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_adm_keuangan_kerjaSama
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        IMAGE.hapus_file(req.body.fileOld);
        res.send('ok')
    });
})
// ============================== KEUANGAN KERJA SAMA ====================================



// ============================== KEUANGAN PENDAMPINGAN ====================================
router.post('/view_keuangan_pendampingan', (req, res) => {
    var query = `
        FOR data in m_adm_keuangan_pendampingan
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/addData_keuangan_pendampingan', (req,res)=>{
    var reques = JSON.stringify(req.body)
    console.log(reques);
    var query = `
        insert `+reques+` into m_adm_keuangan_pendampingan
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_keuangan_pendampingan',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in m_adm_keuangan_pendampingan
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_adm_keuangan_pendampingan
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


router.post('/removeData_keuangan_pendampingan', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_adm_keuangan_pendampingan
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_adm_keuangan_pendampingan
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})
// ============================== KEUANGAN PENDAMPINGAN ====================================



// ============================== KEUANGAN INTENSITAS ====================================
router.post('/view_keuangan_intensitas', (req, res) => {
    var query = `
        FOR data in m_adm_keuangan_intensitas
        FILTER data.id_bumDes == '`+req.body.id_bumDes+`'

        RETURN data
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    });



});

router.post('/addData_keuangan_intensitas', (req,res)=>{
    var reques = JSON.stringify(req.body)
    console.log(reques);
    var query = `
        insert `+reques+` into m_adm_keuangan_intensitas
    `
    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });


});

router.post('/editData_keuangan_intensitas',(req, res) => {
    var reques = JSON.stringify(req.body)
    // console.log(reques)
    var query = `
        FOR i in m_adm_keuangan_intensitas
        FILTER i.id == '`+req.body.id+`'
        UPDATE i WITH `+reques+` IN m_adm_keuangan_intensitas
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


router.post('/removeData_keuangan_intensitas', (req, res)=> {
    var reques = JSON.stringify(req.body)
    var query = `
        FOR data IN m_adm_keuangan_intensitas
        filter data.id == '`+req.body.id+`'
        REMOVE data IN m_adm_keuangan_intensitas
    `

    console.log(query)

    db.query(query)
    .then(cursor => cursor.all())
    .then((row, err)=>{
        res.send('ok')
    });
})
// ============================== KEUANGAN INTENSITAS ====================================






module.exports = router;
