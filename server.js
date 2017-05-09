var express = require('express');
var app = express();  
var mongoose = require('mongoose');

var initialList = require('./shoplist-default.json');
var listen_port = 9981;

/* database connection */
mongoose.connect('mongodb://localhost:27017/shoplist');

/* configuration */
app.configure(function() {  
    app.use(express.static(__dirname + '/app'));
    app.use(express.static(__dirname + '/node_modules'));
    app.use(express.logger('dev')); 
    app.use(express.bodyParser());
    app.use(express.methodOverride());                  
});

/* database model */
var ShopList = mongoose.model('ShopList', {  
    text: String,
    done: {type: Boolean, default: false},
    star: {type: Boolean, default: false}
});

/* initialize the database if empty */
ShopList.count(function(err, c) {
    if (c == 0) {
        ShopList.insertMany(initialList, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("ShopList has been initialized.");
            }
        });
    }
});

/* endpoints */
app.get('/api/shoplist', function(req, res) {  
    ShopList.find({done:false}, function(err, list) {
        if(err) {
            res.send(err);
        }
        res.json(list);
    });
});

app.get('/api/shoplist/starred', function(req, res) {  
    ShopList.find({done:true, star:true}, null, {sort: {text:1}}, function(err, list) {
        if(err) {
            res.send(err);
        }
        res.json(list);
    });
});

app.post('/api/shoplist', function(req, res) {  
    ShopList.create({
        text: req.body.text
    }, function(err, list){
        if(err) {
            res.send(err);
        }
        //retrieve the whole list
        ShopList.find({done:false}, function(err, list) {
            if(err){
                res.send(err);
            }
            res.json(list);
        });
    });
});

app.put('/api/shoplist/:item', function(req, res) { 
    ShopList.findById({
        _id: req.params.item
    }, function(err, found){
        if(err) {
            res.send(err);
        }
        //update the found item
        found.text = req.body.text;
        found.done = req.body.done;
        found.star = req.body.star;
        found.save(function(err, found){
            if (err) {
                res.send(err);
            }
        }) /* save() returns promises */
        .then(function(){
            //retrieve the whole list
            ShopList.find({done:false}, function (err, list) {
                if (err) {
                    res.send(err);
                }
                res.json(list);
            });
        });
    });
});

app.delete('/api/shoplist/:item', function(req, res) {
    ShopList.findById({
        _id: req.params.item
    }, function(err, found) {
        if(err){
            res.send(err);
        }
        //if starred item, only update the 'done' attr
        if(found.star) {
            found.done = true;
            found.save(function(err, found){
                if (err) {
                    res.send(err);
                }
            })
            .then(function() {
                //retrieve the whole list
                ShopList.find({done:false}, function (err, list) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(list);
                });
            });
        }
        //it's not a starred item, remove it
        else {
            ShopList.remove({
                _id: req.params.item
            }, function(err, item) {
                if(err){
                    res.send(err);
                }
                //retrieve the whole list
                ShopList.find({done:false}, function(err, list) {
                    if(err){
                        res.send(err);
                    }
                    res.json(list);
                });
            });
        }
    });
});

//define where the index is placed
app.get('*', function(req, res) {  
    res.sendfile('./app/index.html');                
});

/* run */
app.listen(listen_port, function() {  
    console.log('App listening on port ' + listen_port);
});
