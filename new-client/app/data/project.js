var joi = require("joi");

module.exports = joi.object().keys({
    name: joi.string().required(),
    config: joi.object().keys({
        languages: joi.array().items(joi.string().required()).min(1), //['dev'],
        namespaces: joi.array().items(joi.string().required()).min(1), //['translation'],
        resGetPath: joi.string().required(), //'locales/__lng__/__ns__.json',
        resUpdatePath: joi.string().required(), //'locales/change/__lng__/__ns__',
        resRemovePath: joi.string().required(), //'locales/remove/__lng__/__ns__',
        fallbackLng: joi.string().required(), //'dev',
        //lowerCaseLng: false,
        //sendType: 'POST',
        //postAsync: 'true',
        //getAsync: 'true'
    })
});