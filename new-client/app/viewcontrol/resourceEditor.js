define([
    'underscore',
    'jquery',
    'backbone',
    'viewcontrol/resourceItem',
    'i18next',
    'tpl!templates/resourceEditorLayout.tpl',
    'tpl!templates/addProject.tpl'
],

    function (_, $, Backbone, ResourceItem, i18n, template, addProjectTpl) {
        var compareLng = '';

        return Backbone.View.extend({
            tagName: 'div',

            initialize: function (options) {
                this.state = options.state;

                this.state.set("view:editor", new Backbone.Model());

                this.el.innerHTML = template({
                    i18next: i18n
                });

                new ResourceItem({
                    state: this.state,
                    el: this.$("#resources")
                });

                this.state.on("evt:editor:change:project", this.onChangeProject, this);
                this.state.on("evt:app:fetched:projects", this.onProjectsFetched, this);
            },

            events: {
                'click #add': 'ui_add',
                'keyup .filter': 'ui_filter',
                'keyup .filter-value': 'ui_filter_value',
                'click .wt-s-add-project': "onAddProject"
            },

            onProjectsFetched: function (data) {
                var html = "";
                _.each(data.projects, function (project) {
                    html += '<option value="' + project.name + '">' + project.name + '</option> ';
                });

                this.$("#projects").html(html);
            },

            onChangeProject: function () {

            },

            onAddProject: function (e) {
                e.preventDefault();

                var el = $(addProjectTpl({
                    i18next: i18n
                }));

                el.appendTo(document.body);
                el.modal();
                el.find(".wt-s-namespaces").selectivity({
                    multiple: true,
                    placeholder: 'Type the available namespaces',
                    inputType: 'Multiple',
                    createTokenItem: function(token) {
                        return { id: token, text: token };
                    },
                    showDropdown: false
                    //tokenizer: emailTokenizer
                });
                
                el.find(".wt-s-languages").selectivity({
                    multiple: true,
                    placeholder: 'Type the available languages',
                    inputType: 'Multiple',
                    createTokenItem: function(token) {
                        return { id: token, text: token };
                    },
                    showDropdown: false
                    //tokenizer: emailTokenizer
                });
                
                el.find(".wt-s-save").one("click", function(e) {
                    var namespaces = el.find(".wt-s-namespaces").selectivity("data");
                    var languages = el.find(".wt-s-languages").selectivity("data");
                    
                    var data = {
                        namespaces: namespaces,
                        languages: languages
                    };
                    
                    $.ajax({
                        url: "api/projects",
                        type: "POST",
                        data: JSON.stringify(data)
                    });
                });
            },

            ui_filter: _.debounce(function (e) {
                //e.preventDefault();
                this.state.trigger("evt:editor:filter:keys", {
                    value: this.$('.filter').val()
                });
            }, 250),

            ui_filter_value: _.debounce(function (e) {
                this.state.trigger("evt:editor:filter:values", {
                    value: this.$('.filter-value').val()
                });
            }, 250),

            ui_load: function (e) {
                if (e) e.preventDefault();

                var lng = this.$('#languages').val(),
                    ns = this.$('#namespaces').val();

                compareLng = this.$('#compare-lng').val();

                var flatLocales = this.state.get("data:flatLocales");

                var compareItem = flatLocales[compareLng][ns],
                    currentItem = flatLocales[lng][ns];

                if (currentItem.models.length > 0) {
                    var counter = currentItem.models.length,
                        compareCounter = compareItem.models.length,
                        i = 0,
                        j = 0;

                    for (i = 0; i < counter; i++) {
                        var checkCompare = false;
                        for (j = 0; j < compareCounter; j++) {
                            if (compareItem.models[j] && compareItem.models[j].get('key') == currentItem.models[i].get('key')) {
                                currentItem.models[i].set({
                                    'compare': compareItem.models[j].get('value')
                                });
                                checkCompare = true;
                                break;
                            }
                        }
                        if (!checkCompare) {
                            currentItem.models[i].set({
                                'compare': ''
                            });
                        }
                    }
                }

                flatLocales[lng][ns].each(function (model) {

                });

                var colView = new module.Views.Resources({
                    collection: resSync.flat[lng][ns],
                    parent: this
                });

                this.resources.show(colView);
            },

            ui_add: function (e) {
                e.preventDefault();
                var self = this;

                var key = this.$('#addKey').val();

                resSync.update(
                    this.$('#languages').val(),
                    this.$('#namespaces').val(),
                    key,
                    '',
                    function (err) {
                        self.$('#addKey').val('')
                            .blur();

                        var binding = self.bindTo(self.resources.currentView, 'render', function () {
                            setTimeout(function () {
                                var sel = '#' + key.replace(/\./g, '');
                                var checkSel = '.resources:not(:has(' + sel + '))';
                                while ($(sel) < 0) {
                                    // doNothing
                                }
                                $.smoothScroll({
                                    offset: -90,
                                    direction: 'top', // one of 'top' or 'left'
                                    scrollTarget: sel, // only use if you want to override default behavior
                                    //afterScroll: null,   // function to be called after scrolling occurs. "this" is the triggering element
                                    easing: 'swing',
                                    speed: 400
                                });
                                self.unbindFrom(binding);
                            }, 200);
                        }, self);

                        self.resources.currentView.collection.sort();

                    }
                );

            },

            render: function () {
                var data = resSync.options,
                    i, len, opt, item;

                var lngs = "";
                for (i = 0, len = data.languages.length; i < len; i++) {
                    opt = data.languages[i];
                    lngs += '<option value="' + opt + '">' + opt + '</option> ';
                }


                var nsList = "";
                for (i = 0, len = data.namespaces.length; i < len; i++) {
                    opt = data.namespaces[i];
                    nsList += '<option value="' + opt + '">' + opt + '</option> ';
                }

                this.el.querySelector("#languages").innerHTML = lngs;
                this.el.querySelector("#compare-lng").innerHTML = lngs;
                this.el.querySelector("#namespaces").innerHTML = nsList;

                this.ui_load();
            },

            onShow: function () {
                var self = this;

                this.$('#languages').chosen().change(function () {
                    self.ui_load();
                });
                this.$('#namespaces').chosen().change(function () {
                    self.ui_load();
                });
                this.$('#compare-lng').chosen().change(function () {
                    self.ui_load();
                });
            }
        });
    });