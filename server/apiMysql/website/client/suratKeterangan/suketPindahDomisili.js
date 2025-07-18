const express = require('express');
// var db = require('../../../../db/Arango/connections');

var db = require('../../../../db/Arango/connections');

var multer = require("multer");
var upload = require('../../../../db/multer/pdf');
var IMAGE = require('../../../../library/image');

var uniqid = require('uniqid');
const sharp = require('sharp');


const router = express.Router();

router.get('/', (req, res) => {
    res.render("suketPindahDomisili", {
        data: "SUKET PINDAH DOMISILI",
    })

});


module.exports = router;
