const {
    GOODBYE, WELCOME, FORGOT_PASSWORD, ACC_CREATED
} = require('../configs/email.actions.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'willkomen mein freunde'
    },
    [GOODBYE]: {
        templateName: 'adios',
        subject: 'adios! hasta luego mi amigo'
    },
    [FORGOT_PASSWORD]: {
        templateName: 'forgot_pass',
        subject: 'everybody forgot smth!'
    },
    [ACC_CREATED]: {
        templateName: 'acc_created',
        subject: 'gratz ADMIN!'
    }
};
