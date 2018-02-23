var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require("path");
app.use(express.static(path.join(__dirname, "./static")));

let mongoose = require('mongoose');

app.use(express.static( __dirname + '/authorsAngular/dist' ));


// ==== NEW MONGOOSE CODE! =======
mongoose.connect('mongodb://localhost/authors');
mongoose.Promise = global.Promise;

let AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: [3, "Author name needs to be greater than 3 characters!"]},
    quotes: [{text: String, votes: Number}]
}, {timestamps: true});

mongoose.model('Author', AuthorSchema); 
let Author = mongoose.model('Author')
// ==============================

app.get('/authors', function(req, res){
    Author.find({}, function(err, data){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", data}) //this returns an object because it includes a message.
        }
     })
});

app.get('/authors/:id', function(req, res){
    Author.findOne({_id: req.params.id}, function(err, author){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
           res.json({message: "Success", data: author})
        }
     })
})

app.post('/authors', function(req, res){
    console.log(req.body)

    let author = new Author(req.body)
    author.save( function(err){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success"})
        }
     })
});

app.put('/authors/:id', function(req, res){
    Author.update({_id: req.params.id}, {$set: {name: req.body.name}}, function(err, data){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            console.log('successfully updated the author', data);
            res.json({message: "Success"});
        }
     })
});

app.delete("/authors/:id", function(req, res) {
    console.log('initiating removal');
    Author.remove({_id: req.params.id},function(err, data) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log("post error ",err);
          res.send(err);
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully deleted author',data);
          res.json({message: "Success"});
        }
    });
});

app.post('/quotes/:id', function(req, res){
    console.log("hello2222")
    var newQuote = {text: req.body.text, votes: 0};
    console.log(newQuote)
    console.log("posting new quote:", req.body.text);
    Author.update({_id: req.params.id}, {$push: {quotes: newQuote}}, function(err, results){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", results})
        }
     })
});

app.put("/quotes/:id", function(req, res) {
    console.log('initiating removal');
    Author.findOne({_id: req.params.id},function(err, data) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log("quote delete findAuthor error ",err);
          res.json({message: "Error", error: err});
        } else {
            let updatedQuotes = data.quotes;
            updatedQuotes.splice(req.body.index, 1)
            data.update({quotes: updatedQuotes}, function(err, results) {
                if (err) {
                    console.log("quote delete authorupdate error ", err); 
                    res.json({message: "Error", error: err});
                } else {
                    res.json({message: "Success", results});
                    console.log('successfully deleted author',data);
                }
            })
        }
    });
});

app.put("/quotes/:id/up", function(req, res) {
    console.log('increasing votes');
    Author.findOne({_id: req.params.id},function(err, data) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log("voteUp findAuthor error ",err);
          res.json({message: "Error", error: err});
        } else {
            let updatedQuotes = data.quotes;
            console.log(updatedQuotes);
            console.log("BODy",req.body);
            updatedQuotes[req.body.index].votes +=1
            data.update({quotes: updatedQuotes}, function(err, results) {
                if (err) {
                    console.log("Voteup authorUpdate error ", err); 
                    res.json({message: "Error", error: err});
                } else {
                    res.json({message: "Success", results});
                    console.log()
                    console.log('successfully voted up',data);
                }
            })
        }
    });
});

app.put("/quotes/:id/down", function(req, res) {
    console.log('decreasing votes');
    Author.findOne({_id: req.params.id},function(err, data) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log("voteDown findAuthor error ",err);
          res.json({message: "Error", error: err});
        } else {
            let updatedQuotes = data.quotes;
            console.log(updatedQuotes);
            console.log("BODy",req.body);
            updatedQuotes[req.body.index].votes -=1
            data.update({quotes: updatedQuotes}, function(err, results) {
                if (err) {
                    console.log("VoteDown authorUpdate error ", err); 
                    res.json({message: "Error", error: err});
                } else {
                    res.json({message: "Success", results});
                    console.log('successfully voted down',data);
                }
            })
        }
    });
});




app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./authorsAngular/dist/index.html"))
  });

app.listen(8000, function() {
    console.log("Authors listening on port 8000");
});