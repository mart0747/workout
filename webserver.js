var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.sendfile('index'); 
});

app.listen(app.get('port'), function() {
    console.log( 'Express started: ' + app.get('port') +'; press Ctrl-c to terminate.' );
});