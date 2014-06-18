var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var SentenceSchema = new Schema({
  sentenceText : String,
  vote : String,
  percentage : Number,
  user : String,
  submissionDate : Date,
  mail : String
});

module.exports = mongoose.model('Sentence', SentenceSchema);