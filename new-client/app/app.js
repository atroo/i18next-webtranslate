define([
    "backbone", 
    "control/projectLoader",
    "control/resourceSync",
    "viewcontrol/resourceEditor",
    "util/componentState"
], function(Backbone, ProjectLoader, ResourceSync, Editor, ComponentState) {
    
    "use strict";
    
    return Backbone.View.extend({
        el: document.querySelector("body"),
        initialize: function() {
            this.state = new ComponentState();
            
            this.state.trigger("evt:app:start:init");
            
            this.viewController = {
                resourceEditor: Editor
            };
            
            this.controller = {
                projectLoader: ProjectLoader,
                resourceSync: ResourceSync
            };
            
            for(var key in this.controller) {
                this.controller[key] = new this.controller[key]({
                    state: this.state
                });
            }
            
            for(var key in this.viewController) {
                this.viewController[key] = new this.viewController[key]({
                    state: this.state,
                    el: document.querySelector(".main-inner")
                });
                
            }
            
            this.state.on("evt:app:fetched:projects", this.onProjectsFetched, this);
            
            this.state.trigger("evt:app:finish:init");
            
            this.state.execute("cmd:app:load:projects");
            
            //this.state.execute("cmd:app:load:locales");
        },
        
        onProjectsFetched: function(data) {
            this.state.get("view:editor").set("currentProject", data.projects[0]);
            
            this.state.trigger("evt:editor:change:project");
        }
    });
    
});