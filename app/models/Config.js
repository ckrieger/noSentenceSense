var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var ConfigSchema = new Schema({
    mail : String,
    mailPassword : String,
    mailAddressee : String
  });


module.exports = mongoose.model('Config', ConfigSchema);