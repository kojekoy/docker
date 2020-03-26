//UPDATE atau INSERT kedealam DATABSE
var mysql = require("mysql");
//const osutils = require("os-utils");
var os 	= require('os-utils');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// default route
app.get('/', function (req, res) {
    res.send('Hello ISR')
});
app.listen(3000);
// Connection Configurations
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'tesdb'
});
con.connect();
// Ambil data dari DATABASE
app.get('/data', function (req, res) {
    con.query('SELECT * FROM docker', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'DATA HEALTYCHECK' });
      });
    });
//Execute To DATABASE
app.get('/update',function(req,res){
var mem= osutils.totalmem();
var fmem= osutils.freemem();
var cpu= osutils.freememPercentage();
var id = 1
//var mem= os.totalmem();
//var fmem= os.freemem();
//var cpu= os.freememPercentage();
   // var sql = "INSERT INTO docker (memt, memf, cpu) VALUES ('"+mem+"', '"+fmem+"','"+cpu+"')";
    var sql = "UPDATE docker set memt=?, memf=?, cpu=? WHERE id=?"
    con.query(sql,[mem,fmem,cpu,id], function (err, result) {
        if (err) throw err;
        console.log("UPDATE to, ID: " + id);
res.redirect('/')
     });
    });
