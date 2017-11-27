const express = require('express');
//const bodyParser = require('body-parser');

//app = express();
console.log('module routes activated');

var router = express.Router();

router.get('/test', function(req, res){
    //console.log('api working!');
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('api working!');
});

router.get('/students', function(req, res){

});

module.exports = router;


// app.get('/api/test', function(req, res){
//     console.log('api working!');
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('api working!');
// });