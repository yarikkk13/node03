const nodemailer = require('nodemailer');

const { mainConfigs } = require('../configs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mainConfigs.EMAIL_HOST_USER,
        pass: mainConfigs.EMAIL_HOST_PASSWORD
    }
});

const sendMail = (userMail) => {
    console.log(2);

    return transporter.sendMail({
        from: 'No_reply',
        to: userMail,
        subject: 'hello world',
        html: '<h1>test</h1>'
    });
};

module.exports = {
    sendMail,
};
