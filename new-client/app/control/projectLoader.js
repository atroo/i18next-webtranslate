define(["jquery"], function($) {
    
    
    return function(data) {
        var state = data.state;
        
        state.cmd.setHandler("cmd:app:load:projects", loadProjects);
        
        function loadProjects() {
            $.ajax({
                url: "api/projects",
                success: function(projects) {
                    state.set("data:projects", projects);
                    
                    state.trigger("evt:app:fetched:projects", {
                        projects: projects
                    });
                }
            });
        }
    };
})