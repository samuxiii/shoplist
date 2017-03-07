var express = require('express');  
var app = express();  
var mongoose = require('mongoose');
var listen_port = 9981;

/* database connection */
mongoose.connect('mongodb://localhost:27017/shoplist');

/* configuration */
app.configure(function() {  
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev')); 
    app.use(express.bodyParser());
    app.use(express.methodOverride());                  
});

/* database model */
var ShopList = mongoose.model('ShopList', {  
    text: String
});

/* endpoints */
app.get('/api/shoplist', function(req, res) {  
    ShopList.find(function(err, list) {
        if(err) {
            res.send(err);
        }
        res.json(list);
    });
});

app.post('/api/shoplist', function(req, res) {  
    ShopList.create({
        text: req.body.text,
        done: false
    }, function(err, list){
        if(err) {
            res.send(err);
        }
        //retrieve the whole list
        ShopList.find(function(err, list) {
            if(err){
                res.send(err);
            }
            res.json(list);
        });
    });
});

app.delete('/api/shoplist/:item', function(req, res) {  
    ShopList.remove({
        _id: req.params.item
    }, function(err, item) {
        if(err){
            res.send(err);
        }
        //retrieve the whole list
        ShopList.find(function(err, list) {
            if(err){
                res.send(err);
            }
            res.json(list);
        });

    })
});

//define where the index is placed
app.get('*', function(req, res) {  
    res.sendfile('./public/index.html');                
});

/* run */
app.listen(listen_port, function() {  
    console.log('App listening on port ' + listen_port);
});
