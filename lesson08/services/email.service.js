const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const templatesInfo = require('../templates');

const { mainConfigs, statusCodes } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mainConfigs.EMAIL_HOST_USER,
        pass: mainConfigs.EMAIL_HOST_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateToSend = templatesInfo[emailAction];
    context = { ...context, frontendURL: mainConfigs.FRONTED_URL };

    if (!templateToSend) {
        throw new ErrorHandler(statusCodes.SERVER_ERROR, 'choose another template name');
    }

    const { templateName, subject } = templateToSend;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No_reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail,
};
