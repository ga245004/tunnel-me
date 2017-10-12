const lt = require('localtunnel');
const qrcode = require('qrcode-terminal');
const express = require('express')
var exec = require('child_process').execSync;

var argv = {};

argv.port = 4545;
argv.subdomain = "gaurav";

if (typeof argv.port !== 'number') {
    require('yargs').showHelp();
    console.error('port must be a number');
    process.exit(1);
}

var opt = {
    host: argv.host,
    port: argv.port,
    local_host: argv['local-host'],
    subdomain: argv.subdomain,
};

console.log('creating tunnel for port ' + opt.port);

lt(opt.port, opt, function(err, tunnel) {
    if (err) {
        throw err;
    }
    console.log('your url is: %s', tunnel.url);

    qrcode.generate(tunnel.url, function (qrcode) {
        console.log(qrcode);
    });

    console.log('your url is: %s', tunnel.url);

    console.log('');
    console.log('');
    console.log('');
    qrcode.generate(tunnel.url, function (qrcode) {
        console.log(qrcode);
    });


    tunnel.on('error', function(err) {
        throw err;
    });
});

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/lock', function (req, res) {
  
    var cmd = "rundll32.exe user32.dll, LockWorkStation";
    
    var options = {
      encoding: 'utf8'
    };
    
    res.send(exec(cmd, options));
});


app.get('/unlock', function (req, res) {
    res.send('Hello World!')
});

app.listen(opt.port, function () {
  console.log('App listening on port ' + opt.port );
});
