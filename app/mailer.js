var nodemailer = require("nodemailer");
var config = require('./models/Config.js');

var sendMail = function(mail, mailPassword, selectedReason) {
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: mail,
            pass: mailPassword
        }
    });
    var mailOptions = {
            from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
            to: "christoph-krieger1@gmx.de", // list of receivers
            subject: "Satz gemeldet Reason  " + selectedReason, // Subject line
            text: "hi was geht", // plaintext body
            html: "<b>Hello world ✔</b>" // html body
        }
        // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
            smtpTransport.close();
        }
	});
};



module.exports.sendMail = sendMail;
