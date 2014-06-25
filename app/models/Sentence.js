var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var SentenceSchema = new Schema({
  sentenceText : String,
  senseVote : Number,
  nosenceVote : Number,
  notSureVote : Number,
  user : String,
  submissionDate : Date,
  mail : String
});

SentenceSchema.statics.findTop5 = function( reqIn, resIn, callback) {
  this.find({},{},{skip:0, limit:5, sort:{senseVoted: -1}}, function(err, data){
    data.forEach(function(entry){
      var totalVotes = entry.senseVote + entry.nosenceVote + entry.notSureVote;
      
      if (totalVotes != 0){
      entry.percentage = (100/totalVotes) * entry.senseVotes;}
      else{
        entry.percentage = 0;
      }
      console.log(totalVotes);
      console.log(entry.percentage);
    })
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

module.exports = mongoose.model('Sentence', SentenceSchema);