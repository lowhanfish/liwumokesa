const express = require('express');
// var db = require('../../../../db/Arango/connections');

var db = require('../../db/Arango/connections');

var multer = require("multer");
var upload = require('../../db/multer/pdf');
var IMAGE = require('../../library/image');

var uniqid = require('uniqid');
const sharp = require('sharp');


const router = express.Router();

router.get('/', (req, res) => {
    let view = `
        SELECT * FROM masterCalon;
    `;
    db.query(view, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);
        }
    })
});

router.post('/bar', (req, res) => {

    var query = `
    for data in dpt
    COLLECT WITH COUNT INTO length
    
    return {jml_dpt:length}
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err)
            } else {
                res.send(row[0])
            }
        });



});

router.post('/barRelawan', (req, res) => {

    var query = `
        for data in relawan

        COLLECT WITH COUNT INTO length
        
        return length
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err)
            } else {
                res.send({jml : row[0]})
            }
        });

});


router.post('/barDukungan', (req, res) => {

    var query = `
        for data in dukungan

        COLLECT WITH COUNT INTO length
        
        return length
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err)
            } else {
                res.send({jml : row[0]})
            }
        });

});



router.post('/PotensiWilayah', (req, res) => {

    console.log("POTENSI WILAYAH")

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }



    var query = `
        for data in masterPotensiWilayah
        let potensi = (
            for potensix in desa_potensiWiayah
            filter data.id == potensix.masterPotensiWilayah
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)
        
        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)


        });

});

router.post('/JenisUsaha', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
        for data in masterJenisUsaha
        let potensi = (
            for potensix in desa_jenisUsaha
            filter data.id == potensix.masterJenisUsaha
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)
        
        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });

});


router.post('/Pendidikan', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
        for data in masterPendidikan
        let potensi = (
            for potensix in desa_pendidikan
            filter data.id == potensix.masterPendidikan
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)
        
        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            
            res.send(row)
        });

});



router.post('/Pekerjaan', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
        for data in masterPekerjaan
        let potensi = (
            for potensix in desa_pekerjaan
            filter data.id == potensix.masterPekerjaan
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)
        
        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });

});


router.post('/Agama', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
        for data in masterAgama
        let potensi = (
            for potensix in desa_agama
            filter data.id == potensix.masterAgama
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)
        
        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });

});


router.post('/Keluarga', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& datax2.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
            let wanita = (
                for datax2 in desa_keluarga
                filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
                return TO_NUMBER (datax2.wanita)
            )
            
            let pria = (
                for datax2 in desa_keluarga
                filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
                return TO_NUMBER (datax2.pria)
            )
            
            let kk = (
                for datax2 in desa_keluarga
                filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
                return TO_NUMBER (datax2.kk)
            )
            
            return {
                wanita : SUM(wanita),
                pria : SUM(pria),
                kk : SUM(kk)
            
            }

    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(
                    [{
                        jumlah : row[0].pria,
                        uraian : "Pria"
                    },
                    {
                        jumlah : row[0].wanita,
                        uraian : "Wanita"
                    },
                    {
                        jumlah : row[0].kk,
                        uraian : "KK"
                    }]
                )
        });

});



router.post('/PiramidaPenduduk', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& datax2.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
    let u0_6 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u0_6)
    )
    let u7_12 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u7_12)
    )
    let u13_19 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u13_19)
    )
    let xxxxx = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.xxxxx)
    )
    let u20_27 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u20_27)
    )
    let u28_35 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u28_35)
    )
    let u36_42 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u36_42)
    )
    let u43_50 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u43_50)
    )
    let u50_60 = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u50_60)
    )
    
    let u60_keatas = (
        for datax2 in desa_piramidaPenduduk
        filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
        return TO_NUMBER (datax2.u60_keatas)
    )
    
    
    return {
    
        u0_6 : SUM(u0_6),
        u7_12 : SUM(u7_12),
        u13_19 : SUM(u13_19),
        u20_27 : SUM(u20_27),
        u28_35 : SUM(u28_35),
        u36_42 : SUM(u36_42),
        u43_50 : SUM(u43_50),
        u50_60 : SUM(u50_60),
        u60_keatas : SUM(u60_keatas)
    
    }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {

            var jumlah = [row[0].u0_6, row[0].u7_12, row[0].u13_19, row[0].u20_27, row[0].u28_35, row[0].u36_42, row[0].u43_50, row[0].u50_60, row[0].u60_keatas];
            var uraian = ["0-6", "7-12", "13-19", "20-27", "28-35", "36-42", "43-50", "50-60", ">6"]

            var data = []

            for (let i = 0; i < jumlah.length; i++) {
                data.push({
                    uraian : uraian[i],
                    jumlah : jumlah[i]
                })
                
            }
            
            res.send(data)
        });

});

router.post('/StatusSosial', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& datax2.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `

            let kawin = (
                for datax2 in desa_statusSosial
                filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
                return TO_NUMBER (datax2.kawin)
            )
                        
            let belum_kawin = (
                for datax2 in desa_statusSosial
                filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
                return TO_NUMBER (datax2.belum_kawin)
            )
            
            let janda_duda = (
                for datax2 in desa_statusSosial
                filter datax2.tahun == `+req.body.tahun+` `+cari_des_kel+` 
                return TO_NUMBER (datax2.janda_duda)
            )
            
            return {
                kawin : SUM(kawin),
                belum_kawin : SUM(belum_kawin),
                janda_duda : SUM(janda_duda)
            
            }

    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            
            res.send(
                [{
                    jumlah : row[0].kawin,
                    uraian : "Kawin"
                },
                {
                    jumlah : row[0].belum_kawin,
                    uraian : "Belum Kawin"
                },
                {
                    jumlah : row[0].janda_duda,
                    uraian : "Janda/Duda"
                }]
            )
        });

});


router.post('/LayananPendidikan', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
        for data in masterFasilitasPendidikan
        let potensi = (
            for potensix in desa_fasilitasPendidikan
            filter data.id == potensix.masterFasilitasPendidikan
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)

        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });

});

router.post('/LayananPemerintahan', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
        for data in masterFasilitasPemerintahan
        let potensi = (
            for potensix in desa_fasilitasPemerintahan
            filter data.id == potensix.masterFasilitasPemerintahan
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)

        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });

});

router.post('/LayananKesehatan', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
        for data in masterFasilitasKesehatan
        let potensi = (
            for potensix in desa_fasilitasKesehatan
            filter data.id == potensix.masterFasilitasKesehatan
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)

        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });

});

router.post('/LayananUmum', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
        for data in masterFasilitasUmum
        let potensi = (
            for potensix in desa_fasilitasUmum
            filter data.id == potensix.masterFasilitasUmum
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)
        
        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });

});

router.post('/LayananKeagamaan', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
         for data in masterFasilitasKeagamaan
        let potensi = (
            for potensix in desa_fasilitasAgama
            filter data.id == potensix.masterFasilitasKeagamaan
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)

        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });

});

router.post('/LayananPenunjang', (req, res) => {

    var cari_des_kel = ''
    if (req.body.des_kel == undefined || req.body.des_kel == null || req.body.des_kel == ""){
        cari_des_kel = ''
    }else{
        cari_des_kel = `&& potensix.des_kel == '`+req.body.des_kel+`'`
    }

    

    var query = `
        for data in masterFasilitasPenunjang
        let potensi = (
            for potensix in desa_fasilitasPenunjang
            filter data.id == potensix.masterFasilitasPenunjang
            filter potensix.tahun == `+req.body.tahun+` `+cari_des_kel+` 
            return TO_NUMBER(potensix.jumlah)

        )
        return {
            uraian : data.uraian,
            jumlah : SUM(potensi)
        }
    `

    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            res.send(row)
        });

});









router.post('/view', (req, res) => {

    var query = `
        FOR data IN masterCalon
        RETURN data
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err)
            } else {
                // console.log(row[0].data)
                res.send(row)
            }
        });



});


module.exports = router;
