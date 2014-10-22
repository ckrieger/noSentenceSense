
var nodemailer = require("nodemailer");
var config = require('./models/Config.js');

/**
 * [Send Mail to the admin when someone reported a Sentence]
 * @param  {[String]} mail           [mail for the authentication]
 * @param  {[String]} mailPassword   [password for the authentication]
 * @param  {[String]} mailAddressee  [mail of the adresse]
 * @param  {[String]} selectedReason [Reason of the mail]
 * @param  {[String]} sentenceId     [the id of the reported sentence]
 * @return {[type]}                [description]
 */
var sendMail = function(mail, mailPassword, mailAddressee, selectedReason, sentenceId) {
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: mail,
            pass: mailPassword
        }
    });
    var mailOptions = {
            from: "NoSentenceSense <nosentencesensepage@gmail.com>", 
            to: mailAddressee, 
            subject: "Satz gemeldet Grund:  " + selectedReason.item , 
            text: "Der Satz mit der ID:" , 
            html: "<b>Der gemeldete Satz hat folgende Id : </b>" + sentenceId + "</br> <b>es liegt folgende Beschwerde vor : </b>" + selectedReason.item 
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
