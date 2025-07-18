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
        
        for datax in suketLainnya
        filter datax.id == '`+req.query.id+`'
        
        for agama in masterAgama
        filter agama.id == datax.agama
        
        for desa in des_kel
        filter datax.des_kel == desa.uniqid
        
        for kecamatan in kecamatan
        filter kecamatan.id == desa.kecamatan
        
        return {
            data : datax,
            agama : agama,
            desa : desa,
            kecamatan : kecamatan
        }
    `



    db.query(query)
        .then(cursor => cursor.all())
        .then((row, err) => {
            if (err) {
                console.log(err)
            } else {
                res.render("suketLainnya", {
                    data: "SUKET BELUM MENIKAH",
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
                    }
                })
            }
        });



    

});


router.get('/generateCard', (req, res) => {

    var urlServer = CONFIG.URL
    var IDX = req.query.id

    var externalURL = urlServer+`cnt_suketLainnya?id=`+IDX

    console.log(externalURL)
    requestify.get(externalURL).then(function (response) {
        // Get the raw HTML response body

        console.log('Okeee')
        var html = response.body; 
        var config = {
            // format: 'A4',
            // orientation: 'landscape',
            
            // width: '1123px',
            // height: '794px',
            width: '794px',
            height: '1223px',
            base : [
                urlServer+'css/huruf.css',
                urlServer+'css/main.css',
                'https://fonts.gstatic.com',
                'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css'
            ],
       
        };
        
        // var output = 'uploads/card' + gelombang_id + '' + tahun_id + '' + userId + '.pdf'
        var output = path.join(__dirname, '../../../../uploads/coba.pdf');
        console.log(output)
     // Create the PDF
        pdf.create(html, config).toFile(output, function (errz, resz) {
            console.log('Tapiii')
           if (errz) return console.log(errz);
           console.log(resz); // { filename: '/pathtooutput/generated.pdf' }
                res.send("okemix")

                // var data = fs.readFileSync(output);
                // res.contentType("application/pdf");
                // res.send(data);
        });
     });










})



module.exports = router;
