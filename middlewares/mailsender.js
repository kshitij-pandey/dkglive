const nodemailer = require("nodemailer");

function mailsend(user, key) {


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mail.cadkg@gmail.com',
            pass: 'Cadkg.in123'
        }
    });
    var mailOptions = {
        from: 'mail.cadkg@gmail.com',
        to: user,
        subject: 'Confirmation Email',
        text: key,
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email Sent Succesfully " + info);
        }
    });
};

module.exports = mailsend;
