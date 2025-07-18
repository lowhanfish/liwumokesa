const express = require('express');
// var db = require('../../../../db/Arango/connections');

const fs = require('fs');
const path = require('path');

var pdf = require('html-pdf');
var requestify = require('requestify');


var db = require('../../../../db/Arango/connections');

var multer = require("multer");
var upload = require('../../../../db/multer/pdf');
var IMAGE = require('../../../../library/image');

var CONFIG = require('../../../config/config');

var uniqid = require('uniqid');
const sharp = require('sharp');





const router = express.Router();

router.get('/', (req, res) => {

    console.log(req.query.id)


    var query = `
        
        for datax in suketTidakMampu
        filter datax.id == '`+req.query.id+`'
        
        for agama in masterAgama
        filter agama.id == datax.agama
        
        for desa in des_kel
        filter datax.des_kel == desa.uniqid

        FOR pegawai in desa_dataPegawai
        FILTER pegawai.des_kel == desa.uniqid && pegawai.penandatangan == 'true'
        
        for kecamatan in kecamatan
        filter kecamatan.id == desa.kecamatan

        for pekerjaan in masterPekerjaan
        filter pekerjaan.id == datax.pekerjaan
        
        return {
            data : datax,
            agama : agama,
            pegawai : pegawai,
            desa : desa,
            kecamatan : kecamatan,
            pekerjaan : pekerjaan
        }
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err)
            } else {
                res.render("suketTidakMampu", {
                    data: "TIDAK MAMPU",
                    DOMAIN : CONFIG.DOMAINX,
                    form : row[0],
                    jk : function(kelamin){
                        if (kelamin == "L") {
                            return 'Laki-Laki'
                        } else {
                            return 'Perempuan'
                        }
                    },
                    tglConvertX : (tgl) => {
                        var date = tgl.split('-')
                    
                        const tglx = date[2]
                        const thnx = date[0]
                        
                        
                        const blnxyz = date[1]
                        const blnxy = parseInt(blnxyz)
                        const blnx = blnxy.toString();
                        var bulan = ''
                        
                        
                        if (blnx == '1') {bulan = 'Januari'} 
                        else if(blnx == '2') {bulan = 'Februari'}
                        else if(blnx == '3') {bulan = 'Maret'}
                        else if(blnx == '4') {bulan = 'April'}
                        else if(blnx == '5') {bulan = 'Mei'}
                        else if(blnx == '6') {bulan = 'Juni'}
                        else if(blnx == '7') {bulan = 'Juli'}
                        else if(blnx == '8') {bulan = 'Agustus'}
                        else if(blnx == '9') {bulan = 'September'}
                        else if(blnx == '10') {bulan = 'Oktober'}
                        else if(blnx == '11') {bulan = 'November'}
                        else if(blnx == '12') {bulan = 'Desember'}
                    
                        return tglx + " " + bulan + " " + thnx;
                    },
                    tglConvertXY : (dd) => {
                    
                        var tgl = dd.split(" ")
                    
                    
                    
                    
                        var date = tgl[0].split('-')
                    
                        const tglx = date[2]
                        const thnx = date[0]
                        
                        
                        const blnxyz = date[1]
                        const blnxy = parseInt(blnxyz)
                        const blnx = blnxy.toString();
                        var bulan = ''
                        
                        
                        if (blnx == '1') {bulan = 'Januari'} 
                        else if(blnx == '2') {bulan = 'Februari'}
                        else if(blnx == '3') {bulan = 'Maret'}
                        else if(blnx == '4') {bulan = 'April'}
                        else if(blnx == '5') {bulan = 'Mei'}
                        else if(blnx == '6') {bulan = 'Juni'}
                        else if(blnx == '7') {bulan = 'Juli'}
                        else if(blnx == '8') {bulan = 'Agustus'}
                        else if(blnx == '9') {bulan = 'September'}
                        else if(blnx == '10') {bulan = 'Oktober'}
                        else if(blnx == '11') {bulan = 'November'}
                        else if(blnx == '12') {bulan = 'Desember'}
                    
                        return tglx + " " + bulan + " " + thnx;
                    },
                    statusSosial : (data) =>{
                        // console.log(data)
                        if (data == 'K') {
                            return 'Kawin'
                        } else if (data == 'BK') {
                            return 'Belum Kawin'
                        } else if (data == 'J') {
                            return 'Janda'
                        }else if (data == 'D') {
                            return 'Duda'
                        }
                    }
                })
            }
        });



    

});




module.exports = router;
