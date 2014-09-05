var sentenceModel = require('./models/Sentence.js');
var captcha = require('./captcha.js');
var mailer = require('./mailer.js');
var config = require('./models/Config.js');
module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });



    app.post('/getCaptcha', function(req, res) {
        captcha.createCaptcha(req, res);

    })

    app.post('/createSentence', function(req, res) {
        sentenceModel.checkAlias(req, res, function(checkResult){
            if(checkResult)
            {
                if (req.body.captchaInput == req.session.captcha) 
                {
                    var sentence = new sentenceModel({
                        sentenceText: req.body.sentence,
                        user: req.body.user,
                        mail: req.body.mail,
                        submissionDate: new Date(),
                        senseVote: 0,
                        noSenseVote: 0,
                        notSureVote: 0,
                        percentage: 0
                    });

                    sentence.save(function(err) {
                        console.log('saved');
                        res.json(1);
                    });
                }
                else
                {
                    res.json(0);
                    console.log("wrong captcha input");
                }
            } else if (!checkResult)
            {
                res.json(2);
                console.log("nickname vergeben");
            }
        });
    
        
    });

    app.post('/getRandomSentence', function(req, res) {
        
        sentenceModel.randomSentence(req, res);
    });

    app.post('/getSentenceById', function(req, res) {
       sentenceModel.find({ _id: req.body.sentenceId }, function (err, data) {
        console.log("server" + data);
        res.json(data);
        res.end('OK');
       });
    });

    app.post('/getTopFive', function(req, res) {
        sentenceModel.findTop5(req, res);
    });

    app.post('/getSentenceByUser', function(req, res){
        console.log(req.body);
        sentenceModel.getSentenceByUser(req, res);
    })

    app.post('/vote', function(req, res) {
        if (req.body.vote == '0') {
            sentenceModel.vote(req.body.id, {
                $inc: {
                    senseVote: 1
                }
            })
        } else if (req.body.vote == '2') {
            sentenceModel.vote(req.body.id, {
                $inc: {
                    noSenseVote: 1
                }
            })
        } else if (req.body.vote == '1') {
            sentenceModel.vote(req.body.id, {
                $inc: {
                    notSureVote: 1
                }
            })
        }
        res.end('Voted')
    });

    app.post('/sendMail', function(req, res) {
        config.findOne(function(err, data) {
            console.log(data);
            mailer.sendMail(data.mail, data.mailPassword, data.mailAddressee, req.body.item);
            res.end('Mail sent');
        });


    });

};
