var mongoose = require('mongoose'),
     Schema  = mongoose.Schema;

  var SentenceSchema = new Schema({
    sentenceText : String,
    user : String,
    mail : String,
    submissionDate : Date,
    senseVote : Number,
    noSenseVote : Number,
    percentageSenseless: Number
  });

// Checks if the alias was used by another user
SentenceSchema.statics.checkAlias = function(reqIn, resIn, callback){
  var query = reqIn.body.user;
  this.find({user : query}, function(err, data){
    if(err){
      console.log("error");
    } else {
      if( data.length == 0 ||data[0].mail === reqIn.body.mail  ){
        callback(true);
      } else{
        callback(false)
      }
    }
  })
}

// get the 5 best rated sentences
SentenceSchema.statics.findTop5 = function( reqIn, resIn, callback) {
  this.find().sort({percentageSenseless: -1}).limit(5).exec( 
    function(err, data) {
      resIn.json(data);
      resIn.end('OK');
    }
  );
};

// get all sentences of a given user 
SentenceSchema.statics.getSentenceByUser = function(reqIn, resIn, callback){
  this.find({user : reqIn.body.user}, function(err, data){
    resIn.json(data);
    resIn.end('OK');
  })
};

// updates the rating for a sentence 
SentenceSchema.statics.vote = function(data, queryIn) {
  if(queryIn == 2){
    this.findOne({ _id: data }, function (err, doc){
      doc.noSenseVote ++;
      doc.percentageSenseless = (100 / (doc.senseVote + doc.noSenseVote)) * (doc.noSenseVote);
      doc.save();
    });
  } 
  else if(queryIn == 0) 
  {
    this.findOne({ _id: data }, function (err, doc){
      doc.senseVote ++;
      doc.percentageSenseless = (100 / (doc.senseVote + doc.noSenseVote)) * (doc.noSenseVote);
      doc.save();
    });
  };
};

// get a random sentence 
SentenceSchema.statics.randomSentence = function(reqIn, resIn){
  this.count(function(err, count){
    if(err){
      console.log(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(function(err, data){
      resIn.json(data);
      resIn.end('OK');
    });
  }.bind(this));
};


module.exports = mongoose.model('Sentence', SentenceSchema);