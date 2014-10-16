var captchaGen = require('captchapng');

var createCaptcha = function(req , res){
	var captcha = parseInt(Math.random()*9000+1000); 
	req.session.captcha = captcha;
	var p = captchaGen(80,30, captcha);
       p.color(0, 0, 0, 0);  
        p.color(80, 80, 80, 255); 

        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
         var valicode = new Buffer(imgbase64).toString('base64'); 
         res.json(valicode);

        
}

module.exports.createCaptcha = createCaptcha;