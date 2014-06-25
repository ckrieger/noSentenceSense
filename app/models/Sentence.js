var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var SentenceSchema = new Schema({
    sentenceText : String,
    user : String,
    mail : String,
    submissionDate : Date,
    senseVote : Number,
    noSenseVote : Number,
    notSureVote : Number
  });

SentenceSchema.statics.findTop5 = function( reqIn, resIn, callback) {
  this.find({},{},{skip:0, limit:5, sort:{senseVoted: -1}}, function(err, data){
      
    resIn.json(data);
    resIn.end('OK');
  })
};

SentenceSchema.statics.vote = function(data, queryIn) {
   this.update({
    _id: data
  }, queryIn, function(err, data) {
    if (err) {
      console.log('err while updating' + err);
      
    } else {
      console.log('updated Sentence');
      
    };
  });  
};

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