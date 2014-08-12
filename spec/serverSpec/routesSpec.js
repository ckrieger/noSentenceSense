// modules =================================================
var express = require('express');
var request = require('request')
var app = express();
var mongoose = require('mongoose');
var session = require('express-session'),
    uuid = require('node-uuid');

// configuration ===========================================

// config files

var mongoUri = 'mongodb://localhost/noSentenceSense';
console.log("mongoUri: " + mongoUri);
mongoose.connect(mongoUri);

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
// 

app.use(session({
    genid: function(req) {
        return uuid.v1()
    },
    secret: 'scienceBitch'
}));

app.configure(function() {
    app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.bodyParser()); // pull information from html in POST
    app.use(express.methodOverride()); // simulate DELETE and PUT
});

// routes ==================================================
require('../../app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user


describe("test for all the serverside routes", function() {

    beforeEach(function(done) {
        mongoose.connection.collections['sentences'].drop(function(err) {
            console.log('collection dropped');
            done();
        });
    });

    it("/getCaptcha", function(done) {
        request.post('http://localhost:8080/getCaptcha', function(error, response, body) {
            expect(body).toBeDefined();
            done()
        });
    });

    it("/createSentence", function(done) {
        var body = {};
        body.user = "bla";
        request.post('http://localhost:8080/createSentence', {
            form: {
                user: 'testUser',
                mail: 'test@mail',
                sentence: 'test sentence'
            }
        }, function(error, response, body) {
            mongoose.connection.collections['sentences'].findOne(function(err, data) {
                if (err) {
                    console.log('err' + err);
                    done();
                } else {
					expect(data.user).toEqual('testUser');
                    expect(data.mail).toEqual('test@mail');
                    expect(data.sentenceText).toEqual('test sentence');
                    done();
                };
            });
        });
    });

    it("/vote", function(done){
        request.post('http://localhost:8080/createSentence', {
            form: {
                user: 'testUser',
                mail: 'test@mail',
                sentence: 'test sentence'
            }
        }, function(error, response, body) {
            mongoose.connection.collections['sentences'].findOne(function(err, data) {
                if (err) {
                    console.log('err' + err);
                    done();
                } else {
                    console.log(data._id);
                  request.post('http://localhost:8080/vote', {
                    form : {
                        vote: '1',
                        id: 53e9d19c2cc1be7c09000002
                    }
                  },function(error, response, body){
                     mongoose.connection.collections['sentences'].findOne(function(err, data) {
                        expect(data.senseVote).toEqual(1);
                     });
                  }) 
                };
            });
        });
    });

    

});
