const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
var path = require('path');
var mime = require('mime');

app.use(cors());
app.options('*', cors());

app.get('/api/showdata', function (req, res) {

    var query = require('url').parse(req.url, true).query;
    var data = query.data;
    if (data == "*") data = " ";

    var logStream = fs.createWriteStream('log.txt', { flags: 'a' });
    // use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
    logStream.write(data);
    //logStream.end('this is the end line');

    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send('Hello World')
})

app.get('/api/lineBreak', function (req, res) {

    let query = require('url').parse(req.url, true).query;
    let data = query.data;

    var logStream = fs.createWriteStream('log.txt', { flags: 'a' });
    // use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
    logStream.write("\n");
    //logStream.end('this is the end line');

    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send('Hello World')
})


app.get('/api/backSpace', function (req, res) {


    var logStream = fs.createWriteStream('log.txt', { flags: 'a' });
    // use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
    logStream.write("#");
    //logStream.end('this is the end line');

    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send('Hello World')
})

app.get('/api/downloadTxt', function (req, res) {
    var file = __dirname + '/log.txt';

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var fileStream = fs.createReadStream(file);
    fileStream.pipe(res);
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));