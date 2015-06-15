define(['underscore', 'backbone'], function(_, Backbone) {

	"use strict";

	var ComponentState = function(options) {
		this.vent = new Backbone.Wreqr.EventAggregator();
		this.cmd = new Backbone.Wreqr.Commands();
		this.reqres = new Backbone.Wreqr.RequestResponse();

		//view namespace repräsentiert den Zustand der UI
		this.viewModel = new Backbone.Model();
		//data namespace beinhaltet Geschäftsdaten aus einer externen Datenquelle
		this.dataModel = new Backbone.Model();
		//config beinhaltet alle Konfigurationseinstellungen für diese Komponente
		this.configModel = new Backbone.Model();

		//wir müssen zwischen mehreren funktionsreferenzen unterscheiden um pro key und namespace einen 
		//eindeutigen listener zu haben, den wir auch wieder entfernen können
		this.proxyMap = {};

		//proxy trough events on viewModel/datamodel
		this.viewModel.on("change", _.bind(proxyTroughModelEvents, this, ["view"]));
		this.dataModel.on("change", _.bind(proxyTroughModelEvents, this, ["data"]));
	};

	function proxyTroughModelEvents(modelname, e) {
		var chgd = e.changed;
		var prev = e.previousAttributes();
		for (var key in chgd) {
			var value = chgd[key];
			this.trigger([modelname, ":change:", key].join(""), value, prev[key]);
		}
	};

	var bindProxyEvents = function(namespace, key, value) {
		if (value instanceof Backbone.Model || value instanceof Backbone.Collection) {
			var proxyKey = [namespace, key].join(":");
			var self = this;

			this.proxyMap[proxyKey] = function(eventName) {
				var eventArgs = Array.prototype.slice.apply(arguments);
				eventArgs.shift();
				eventArgs.unshift(namespace + ":" + key + ":" + eventName);
				self.trigger.apply(self, eventArgs);
			};
			value.on("all", this.proxyMap[proxyKey]);
		}
	};
	var unbindProxyEvents = function(namespace, key) {
		var modelToCheck = this.dataModel;
		if (namespace == "view") {
			modelToCheck = this.viewModel;
		}
		var value = modelToCheck.get(key);

		if (value instanceof Backbone.Model || value instanceof Backbone.Collection) {
			var proxyKey = [namespace, key].join(":");
			value.off("all", this.proxyMap[proxyKey]);
			delete this.proxyMap[proxyKey];
		}
	};

	_.extend(ComponentState.prototype, {
		set: function() {
			var args = Array.prototype.slice.apply(arguments);

			var bindProxyEventsWrapper = _.bind(bindProxyEvents, this);
			var unbindProxyEventsWrapper = _.bind(unbindProxyEvents, this);

			var type, split, keyMap, value, key, newKey;
			keyMap = typeof args[0] == "object" ? args[0] : null;
			key = keyMap ? null : args[0];
			if (keyMap) {
				var newObj = {};
				for (key in keyMap) {
					split = key.split(":");
					type = split[0];
					newKey = split[1];
					newObj[newKey] = keyMap[key];
					unbindProxyEventsWrapper(type, newKey);
					bindProxyEventsWrapper(type, newKey, keyMap[key]);
				}
				args[0] = newObj;
			} else {
				split = key.split(":");
				args[0] = split[1];
				type = split[0];
				newKey = split[1];
				value = args[1];
				unbindProxyEventsWrapper(newKey, type, newKey);
				bindProxyEventsWrapper(type, newKey, value);
			}

			if (type === "view") {
				this.viewModel.set.apply(this.viewModel, args);
			} else if (type === "data") {
				this.dataModel.set.apply(this.dataModel, args);
			}
		},
		get: function() {
			var args = Array.prototype.slice.apply(arguments);

			var type, split;
			if (typeof args[0] == "object") {
				var newObj = {};
				for (var key in args[0]) {
					split = key.split(":");
					newObj[split[1]] = args[0][key];
					type = split[0];
				}
				args[0] = newObj;
			} else {
				split = args[0].split(":");
				args[0] = split[1];
				type = split[0];
			}

			if (type === "view") {
				return this.viewModel.get.apply(this.viewModel, args);
			} else if (type === "data") {
				return this.dataModel.get.apply(this.dataModel, args);
			}
		},
		execute: function() {
			var args = Array.prototype.slice.apply(arguments);
			this.cmd.execute.apply(this.cmd, args);
		},
		on: function() {
			var args = Array.prototype.slice.apply(arguments);
			this.vent.on.apply(this.vent, args);
		},
		off: function() {
			var args = Array.prototype.slice.apply(arguments);
			this.vent.off.apply(this.vent, args);
		},
		trigger: function() {
			var args = Array.prototype.slice.apply(arguments);
			this.vent.trigger.apply(this.vent, args);
		}
	});

	return ComponentState;
});