require([
    "jquery",
    "backbone",
    "marionette",
    "i18next",
    "resources",
    "app",
    "twitterbootstrap",
    "selectivity"
],

function($, Backbone, Marionette, i18next, resources, app) {

    // Shorthand the application namespace
    
    var App = new app();
    
    // global callback
    if (window.i18nextWT_onready) {
        /*window.i18nextWT_onready({
            addResourceSet: function(lng, res) {
                app.languages = app.languages || [];
                if (app.languages.indexOf(lng) < 0) app.languages.push(lng);

                var resSet = {};
                resSet[lng] = {};
                resSet[lng].translation = res;

                app.resStore = app.resStore || {};
                _.extend(app.resStore, resSet);
            },

            config: function(i18nextWTOpts) {
                var i18nextOpts = { 
                    resStore: app.resStore,
                    fallbackLng: 'en'
                };

                app.addAsyncInitializer(function(options, done) {
                    i18next.init(i18nextOpts, function(t) { 
                        ns.t = t;
                        app.setLng(i18next.lng());
                        done();
                    });
                });

                app.addAsyncInitializer(function(options, done) {
                    resSync.init(i18nextWTOpts, function() {
                        done();
                    });
                });

            },

            start: function() {
                app.start(function() {
                    ns.modules.header.controller.standard();
                    ns.modules.footer.controller.standard();
                    
                    Backbone.history.start();
                });
            }
        }); */
    }

});
