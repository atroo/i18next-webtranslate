var express = require('express')
  , app = express()
  , fs = require('fs')
  , url = require('url')
  , i18n = require('i18next');

var joi = require("joi");
var projectScheme = require("./new-client/app/data/project");

// use filesys
i18n.init({
    ns: { namespaces: ['ns.common', 'ns.app', 'ns.layout', 'ns.msg', 'ns.public', 'ns.special'], defaultNs: 'ns.common'},
    preload: ['en', 'zh', 'de', 'fr', 'it', 'dev'],
    resSetPath: 'locales/__lng__/new.__ns__.json',
    saveMissing: true,
    debug: true
});

// Configuration
app.configure(function() {
    app.use(express.bodyParser());
    app.use(i18n.handle); // have i18n befor app.router
    
    app.use(app.router);
    // app.set('view engine', 'jade');
    // app.set('views', __dirname);

    app.use('/app', express.static('new-client/app'));
    app.use('/assets', express.static('new-client/assets'));
    //app.use('/app/templates', express.static('new-client/assets/templates'));

    // for release 
    app.use('/release', express.static('client/dist/release/assets'));
    app.use('/', express.static('client/dist/release/assets'));
});

app.get("/", function(req, res) {
    return res.sendfile('index.html');
});

app.get("/favicon.ico", function(req, res) {
    return res.sendfile('client/assets/favicon.ico');
});


app.get("/api/projects", function(req, res) {
    fs.readFile("./data/projects.json", function(err, data) {
        var obj = JSON.parse(data);
        res.send(obj.projects);
    });
});

app.get("/api/project/:name", function(req, res) {
    
});

app.post("/api/projects", function(req, res) {
    var data = req.body;
    
    console.log(req.body);
    
    projectScheme.validate(data, function(err) {
        if(err) {
            return res.json(err);
        }
        
        
    });
    
});




// API to get locale file content (JSONP)
/*app.get("/api/:locale/:namespace", function(req, res) {
  var locale = req.params.locale
    , namespace = req.params.namespace;

  if (locale && namespace) {
    var file = fs.readFileSync('locales/' + locale + '/' + namespace + '.json', 'utf-8');
    var params = url.parse(req.url, true);
    if (params.query && params.query.callback) {
      var str = params.query.callback + '(' + file + ')';
      res.end(str);
    } else {
      res.end(file);
    }
  }
});*/

i18n.registerAppHelper(app)
    .serveClientScript(app)
    .serveDynamicResources(app)
    .serveMissingKeyRoute(app)
    .serveChangeKeyRoute(app)
    .serveRemoveKeyRoute(app);

 var http = require('http')
   , server = http.createServer(app);

server.listen(3000);
