const express = require('express');
const Productdata = require('./src/model/Productdata');
const cors = require('cors');
var bodyparser = require('body-parser');
var app = new express();

var ObjectId = require('mongoose').Types.ObjectId;

app.use(cors());
app.use(bodyparser.json());

app.get('/products',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access=Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    Productdata.find()
            .then(function(products){
                res.send(products);
            });
});

app.post('/insert',function(req,res){
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access=Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    var product = {
        productID : req.body.product.productID,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl
    }
    var product = new Productdata(product);
    product.save();
});

app.put('/update/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access=Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log("HI"+req.body.product._id);
    // const id = ObjectId(req.body.product._id);
    const id = req.params.id;

    console.log(id);
    var product = {
        // _id: req.body.product._id,
        productID : req.body.product.productID,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl
    }
    console.log(product);

    Productdata.findOneAndUpdate({ _id: id }, product ,{ new: true},(err,doc)=>{
        if(!err){
            console.log(doc);
        }
        else{
            console.log(err);
        }
    });

});

app.delete('/delete/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access=Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log("hi");
    const id = req.params.id;
    console.log(id);
    Productdata.findOneAndDelete({_id:id},(err,doc)=>{
        if(!err){
            console.log("Author deleted"+doc);
        }
        else{
            console.log(err);
        }
});
});

app.listen(3000,function(){
    console.log("Listening to port 3000");
});