const { GOODBYE, WELCOME } = require('../configs/email.actions.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'willkomen mein freunde'
    },
    [GOODBYE]: {
        templateName: 'adios',
        subject: 'adios! hasta luego mi amigo'
    }
};
