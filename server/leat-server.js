module.exports = server;

function server() {
  var
    address, app, bodyParser, cookieParser,
    express, fs, options, port, user, path
  ;
  port          = process.env.EXPRESS_PORT || process.env.PORT || 1337;
  sPort         = process.env.EXPRESS_SECURE_PORT || process.env.SECURE_PORT || 1347;
  address       = process.env.EXPRESS_BIND_ADDRESS || process.env.BIND_ADDRESS || '0.0.0.0';
  express       = require('express');
  bodyParser    = require('body-parser');
  cookieParser  = require('cookie-parser');
  app           = express();
  fs            = require('fs');
  path          = require('path')
  ;
  app.use(bodyParser.json({ extended: true }))
  ;
  app.use(bodyParser.urlencoded({ extended: true }))
  ;
  app.use(express.query())
  ;
  app.use(cookieParser())
  ;
  options = {
    key: fs.readFileSync (path.join(__dirname, '../tmp/ssl.key')),
    cert: fs.readFileSync(path.join(__dirname, '../tmp/ssl.crt')),
    ca: fs.readFileSync  (path.join(__dirname, '../tmp/server.csr'))
  }
  ;
  this.server = require('https').createServer(options, app).listen(sPort, ()=>

     console.log('listening on port ' + sPort + '.')

  ).on('error', e => {
    if(e.code == "EADDRINUSE")
      console.log("cant listen on port " + sPort + ", address is use.")
    ;
  })
  ;
  this.io = require('socket.io')(this.server)
  ;
  require('http').createServer((req, res) => {
    res.writeHead(301, {
      'Location': 'https://' + req.headers.host + req.url
    })
    ;
    return res.end()
    ;
  }).listen(port, ()=>

    console.log('listening on port ' + port + '.')

  ).on('error', e => {

    if(e.code == "EADDRINUSE")
       console.log("cant listen on port " + port + ", address is use.")
    ;
  })
  ;
  this.router = app
  ;
  return this
  ;
}
