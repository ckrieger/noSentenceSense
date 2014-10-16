var nodemailer = require("nodemailer");
var config = require('./models/Config.js');

var sendMail = function(mail, mailPassword, mailAddressee, selectedReason, sentenceId) {
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: mail,
            pass: mailPassword
        }
    });
    var mailOptions = {
            from: "NoSentenceSense <nosentencesensepage@gmail.com>", // sender address
            to: mailAddressee, // list of receivers
            subject: "Satz gemeldet Grund:  " + selectedReason.item , // Subject line
            text: "Der Satz mit der ID:" , // plaintext body
            html: "<b>Der gemeldete Satz hat folgende Id : </b>" + sentenceId + "</br> <b>es liegt folgende Beschwerde vor : </b>" + selectedReason.item // html body
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
