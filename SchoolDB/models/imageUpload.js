var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage }).single('profileImage');


router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);// An error occurred when uploading
        }
        console.log(req.file.filename);
        res.json({
            success: true,
            message: 'Image uploaded!',
            path: '/uploads/' + req.file.filename
        });

        // Everything went fine
    })
});


module.exports = router;