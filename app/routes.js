var sentenceModel = require('./models/Sentence.js')
module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.post( '/sentence', function(req,res){
     var sentence = new sentenceModel({
  	sentenceText : req.body.sentence,
  	senseVote : 0,
  nosenceVote : 0,
  notSureVote : 0,
  percentage : 0,
  user : 'noone',
  submissionDate : new Date(),
  mail : 'none'
  });

  sentence.save(function(err){
  	console.log('saved');
  });
	});

  app.post('/getTopFive', function(req,res){
    sentenceModel.findTop5(req,res);
  });

  app.post('/vote', function(req, res){
    if(req.body.vote == '0'){
      sentenceModel.vote(req.body.id, {
        $inc: {
          senseVote:1
        }
     }) 
    } else if (req.body.vote == '1'){
        sentenceModel.vote(req.body.id, {
          $inc: {
            nosenseVote:1
          }
        }) 
    } else if (req.body.vote == '2'){
        sentenceModel.vote(req.body.id, {
          $inc: {
            notSureVote:1
          }
        })
    }
  });

};