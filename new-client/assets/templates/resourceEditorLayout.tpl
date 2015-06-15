<div class="container">
    <div class="row">
        <div class="span12">
            <div class="well">
                <div class="row-fluid">
                    <div class="span12">
                        <form class="form-inline">
                            <div class="field control-group">
                                <select id="projects" class="span5" name="projects" data-placeholder="projects"></select>
                            </div>
                            <button class="btn btn-primary wt-s-add-project">
                                <%- data.i18next.t("editor.add") %>
                            </button>
                        </form>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span6">
                        <form class="form-inline">
                            <h6><%- data.i18next.t("editor.choose") %>:</h6>
                            <div class="field control-group">
                                <select id="languages" class="span5" name="language" data-placeholder="language"></select>
                            </div>
                            <div class="field control-group">
                                <select id="namespaces" class="span5" name="namespace" data-placeholder="namespace"></select>
                            </div>
                                
                            <h6><%- data.i18next.t("editor.compare") %>:</h6> 
                            <div class="field control-group">
                                <select id="compare-lng" class="span5" name="compare-lng" data-placeholder="compare-lng"></select>
                            </div>
                                
                            <h6><%- data.i18next.t("editor.filterKeys") %>:</h6> 
                            <input type="text" class="span5 filter">    
                                
                            <h6><%- data.i18next.t("editor.filterValue") %>:</h6>    
                            <input type="text" class="span5 filter-value">    
                        </form>
                    </div>
                    <div class="span6">
                        <form class="form-inline">
                            <h6><%- data.i18next.t("editor.addKey") %>:</h6>    
                            <div class="field control-group">
                                <input id="addKey" type="text" class="span5">    
                            </div>
                            <button id="add" class="btn btn-primary">
                                <%- data.i18next.t("editor.add") %>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="span12">
            <div class="row-fluid tableheader">
                <div class="span2">
                    <h4><%- data.i18next.t("editor.th.key") %></h4>
                </div>
                <div class="span5">
                    <h4><%- data.i18next.t("editor.th.specificValue") %></h4>
                </div>
                <div class="span5">
                    <h4><%- data.i18next.t("editor.th.displayedValue") %> / <%- data.i18next.t("editor.th.compareValue") %></h4>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="span12">
            <div id="resources">
            </div>
        </div>
    </div>
        
</div>
<!--
.container
    .row
        .span12
            .well
                .row-fluid
                    .span12
                        form.form-inline
                            .field.control-group
                                select#projects.span5(name='projects', data-placeholder='projects')
                .row-fluid
                    .span6
                        form.form-inline
                            h6 {{t "editor.choose" }}:
                            .field.control-group
                                select#languages.span5(name='language', data-placeholder='language')
                            .field.control-group
                                select#namespaces.span5(name='namespace', data-placeholder='namespace')

                            h6 {{t "editor.compare" }}:
                            .field.control-group
                                select#compare-lng.span5(name='compare-lng', data-placeholder='compare-lng')

                            h6 {{t "editor.filterKeys" }}:
                            input.span5.filter(type='text')
                            h6 {{t "editor.filterValue" }}:
                            input.span5.filter-value(type='text')

                    .span6
                        form.form-inline
                            h6 {{t "editor.addKey" }}:
                            .field.control-group
                                input#addKey.span5(type='text')

                            button#add.btn.btn-primary {{t "editor.add" }}

                            //- h6 {{t "editor.download" }}:
                            //- .field.control-group
                            //-     select#download.span5(name='download', data-placeholder='download')

                            //- button#add.btn.btn-primary {{t "editor.download" }}

    .row
        .span12
            .row-fluid.tableheader
                .span2
                    h4 {{t "editor.th.key" }}

                .span5
                    h4 {{t "editor.th.specificValue" }}

                .span5
                    h4 {{t "editor.th.displayedValue" }} / {{t "editor.th.compareValue" }}

    .row
        .span12
            #resources

-->
