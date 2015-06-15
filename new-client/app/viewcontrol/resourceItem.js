define([
    "backbone",
    "tpl!templates/resourceEditorItem.tpl"
], function(Backbone, itemTpl) {
    
     return Backbone.View.extend({
        tagName: 'div',

        initialize: function(options) {
            this.isHidden = false;
            //this.bindTo(app.vent, 'filter', this.filter, this);
            
            this.state = options.state;
            
            
        },

        events: {
            'click .edit': 'ui_edit',
            'click .editor-wrapper': 'ui_edit',
            'click .cancel': 'ui_cancelEdit',
            'click .save': 'ui_save',
            'click .remove': 'ui_toggleRemove',
            'click .cancelRemove': 'ui_toggleRemove',
            'click .confirmRemove': 'ui_confirmRemove',
            'click .test': 'ui_toggleTest',
            'click .refresh': 'ui_refreshTest',
            'click .compare': 'ui_compare',
            'click .preview': 'ui_preview',
            'click .multiline': 'ui_toggleArray',
            'click .singleline': 'ui_toggleArray',
            'click .compareEdit': 'ui_compare_edit',
            'click .compare-editor-wrapper': 'ui_compare_edit',
            'click .compareCancel': 'ui_compare_cancelEdit',
            'click .compareSave': 'ui_compare_save'
        },

        filter: function(token, value) {
            var reg = new RegExp(token), target;

            if (value) {
               target = this.model.get('value');
            } else {
                target = this.model.get('id');
            }

            if (token === '' && this.isHidden) {
                this.$el.show();
                this.isHidden = false;
            } else if (reg.test(target) === false && !this.isHidden) {
                this.$el.hide();
                this.isHidden = true;
            } else if (reg.test(target) === true && this.isHidden) {
                this.$el.show();
                this.isHidden = false;
            }
        },

        ui_edit: function(e) {
            e.preventDefault();

            if (!this.$('.editor').val()) {
                this.$('.editor').val(this.model.get('fallback').value);
            }

            this.$('.editor').removeAttr('disabled');
            this.$('.editor').focus();
            this.$('.mainCommands').hide();
            this.$('.editCommands').show();
        },

        ui_cancelEdit: function(e, noReplace) {
            if (e) e.preventDefault();

            this.$('.editor').attr('disabled', 'disabled');
            this.$('.mainCommands').show();
            this.$('.editCommands').hide();


            if (!noReplace) {
                this.$('.editor').val(this.model.get('value'));
            }
        },

        ui_save: function(e) {
            if (e) e.preventDefault();

            var self = this;
            this.$('.editCommands button').attr('disabled', 'disabled');

            var raw = this.$('.editor').val()
              , array;

            if (this.model.get('isArray')) {
                array = raw.split('\n');
            }

            resSync.update(
                this.model.get('lng'),
                this.model.get('ns'),
                this.model.id,
                array || raw,
                function(err) {
                    self.model.set('value', raw);
                    self.$('.editCommands button').removeAttr('disabled');
                    self.ui_cancelEdit(undefined, true);
                }
            );
        },

        ui_toggleRemove: function(e) {
            if (e) e.preventDefault();

            if (this.removing) {
                this.removing = false;
                this.$('.removeCommands').hide();
                this.$('.mainCommands').show();
                this.resetI18n(function() {});
            } else {
                this.removing = true;
                this.$('.removeCommands').show();
                this.$('.mainCommands').hide();
            }
        },

        ui_confirmRemove: function(e) {
            if (e) e.preventDefault();

            var self = this;
            this.$('.remove').attr('disabled', 'disabled');

            resSync.remove(
                this.model.get('lng'),
                this.model.get('ns'),
                this.model.id,
                '',
                function(err) { }
            );
        },

        ui_toggleTest: function(e) {
            e.preventDefault();

            if (this.testing) {
                this.testing = false;
                this.$('.testSection').hide();
                this.$('.previewSection').show();
                this.resetI18n(function() {});
            } else {
                this.testing = true;
                this.$('.testSection').show();
                this.$('.previewSection').hide();

                this.ui_refreshTest();
            }
        },

        ui_refreshTest: function(e) {
            if (e) e.preventDefault();

            var self = this;

            var opts = {};
            
            var args = self.$('.i18nOptions').val();
            if (args.length > 0) {
                args = args.replace(new RegExp(' = ', 'g'), '=').split(/\n|\r/);
                for (var i = 0, len = args.length; i < len; i++) {
                    var split = args[i].split('=');
                    if ($.isNumeric(split[1])) {
                        split[1] = parseInt(split[1], 10);
                    } else {
                        split[1] = split[1].replace(/'|"/g, '');
                    }
                    opts[split[0]] = split[1];
                }
            }

            function test(t, o) {
                self.$('.translated').html(t(self.model.get('ns') + ':' + self.model.id, o));
            }

            if (!resSync.i18nDirty) {
                this.prepareI18n(function(t) {
                    test(t, opts);
                });
            } else {
                test(i18n.t, opts);
            }
        },

        ui_compare: function(e) {
            e.preventDefault();

            this.$('.compare-commands').show();
            this.$('.compareControl').show();
            this.$('.preview-commands').hide();
            this.$('.previewControl').hide();
        },

        ui_preview: function(e) {
            e.preventDefault();

            this.$('.compare-commands').hide();
            this.$('.compareControl').hide();
            this.$('.preview-commands').show();
            this.$('.previewControl').show();
        },

        prepareI18n: function(cb) {
            var self= this;

            i18n.init({
                resStore: resSync.resStore,
                lng: this.model.get('lng')
            }, function(t) {
                resSync.i18nDirty = true;
                cb(t);
            });
        },

        resetI18n: function(cb) {
            var self = this;

            i18n.init(resSync.i18nOptions, function(t) {
                resSync.i18nDirty = false;
                if (cb) cb(t);
            });
        },

        ui_toggleArray: function(e) {
            e.preventDefault();

            if (this.model.get('isArray')) {
                this.model.set('isArray', false);
            } else {
                this.model.set('isArray', true);
            }
            this.render();
        },

        onRender: function() {
            this.$el.attr('id', this.model.id.replace(/\./, ''))
                .attr('name', this.model.id.replace(/\./, ''))
                .attr('href', '/#' + this.model.id.replace(/\./, ''));

            var fallbackLng = this.model.get('fallback').lng;
            if (fallbackLng !== this.model.get('lng')) {
                this.$('.resource').addClass('isFallback');
                this.$('.key').addClass('isFallback');
                this.$('.fallbackBadge').removeClass('badge-success')
                    .addClass('badge-warning');
            }
            if (fallbackLng === resSync.options.fallbackLng &&
                this.model.get('lng').indexOf(resSync.options.fallbackLng) < 0) {
                this.$('.resource').addClass('toFallback');
                this.$('.key').addClass('toFallback');
                this.$('.fallbackBadge').removeClass('badge-success')
                    .removeClass('badge-warning')
                    .addClass('badge-error');
            }

            if (this.model.get('isArray')) {
                this.$('.multiline').hide();
            } else {
                this.$('.singleline').hide();
            }
        },

        onClose: function() {
            if (resSync.i18nDirty) {
                this.resetI18n();
            } 
        },

        ui_compare_edit: function(e) {
          e.preventDefault();

          if (!this.$('.compare-editor').val()) {
            //this.$('.compare-editor').val(this.model.get('fallback').value);
          }

          this.$('.compare-editor').removeAttr('disabled');
          this.$('.compare-editor').focus();
          this.$('.compareMainCommands').hide();
          this.$('.compareEditCommands').show();
        },

        ui_compare_cancelEdit: function(e, noReplace) {
          if (e) e.preventDefault();

          this.$('.compare-editor').attr('disabled', 'disabled');
          this.$('.compareMainCommands').show();
          this.$('.compareEditCommands').hide();

          if (!noReplace) {
            this.$('.compare-editor').val(this.model.get('compare'));
          }
        },

        ui_compare_save: function(e) {
          if (e) e.preventDefault();

          var self = this;
          this.$('.compareEditCommands button').attr('disabled', 'disabled');

          var raw = this.$('.compare-editor').val()
            , array;

          if (this.model.get('isArray')) {
            array = raw.split('\n');
          }

          if (compareLng) {
            resSync.update(
              compareLng,
              this.model.get('ns'),
              this.model.id,
              array || raw,
              function(err) {
                self.$('.compareEditCommands button').removeAttr('disabled');
                self.ui_compare_cancelEdit(undefined, true);
              }
            );
          }
        }
    });
    
})