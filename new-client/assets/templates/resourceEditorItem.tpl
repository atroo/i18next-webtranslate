<div class="resource">
    <div class="row-fluid">
        <div class="span2">
            <a class="scrollTo" style="display:none;"></a>
            <div class="key"><%- data.key %></div>
        </div>
        <div class="span5">
            <div class="editor-wrapper" style="display:inline-block; position:relative;">
                <input type="text" class="span5 editor" value="<%- data.value %>" disabled="disabled">
            </div>
        </div>
        <div class="span5">
            <div class="compareControl" style="display:none;">
                <div class="compare-editor-wrapper" style="display:inline-block; position:relative;">
                    <input type="text" class="span5 compare-editor" value="<%- data.compare %>" disabled="disabled">
                </div>
            </div>
        </div>
        <div class="span5">
            <div class="previewControl">
                <div class="testSection" style="display:none;">
                    <h6><%- data.i18next.t("editor.resourceItem.options") %>:</h6>
                    <p>
                        <%- data.i18next.t("editor.resourceItem.optionsDesc") %>
                    </p>
                    <textarea class="span3 i18nOptions" rows="5">
                        
                    </textarea>
                    <button class="pull-right btn btn-warning btn-mini refresh">
                        <i class="icon-refresh"></i>    
                    </button>
                    <div class="well translated">
                    </div>
                </div>
                <div class="previewSection">
                    <%- data.fallbackValue %>
                </div>
            </div>
        </div>
    </div>
    <div class="row-fluid">
        <div class="span2">&nbsp;</div>
        <div class="span5">
            <div class="commands">
                <button class="btn btn-mini singleline">
                    <i class="icon-minus"></i>
                </button>
                <button class="btn btn-mini multiline">
                    <i class="icon-align-justify"></i>
                </button>
                <div class="pull-right editCommands" style='display: none;'>
                    <button class="btn btn-mini cancel">
                        <i class="icon-remove"></i>
                        <%- data.i18next.t("editor.cancel") %>
                    </button>
                    <button class="btn btn-mini btn-warning save">
                        <i class="icon-ok"></i>
                        <%- data.i18next.t("editor.save") %>
                    </button>
                </div>
                <div class="pull-right removeCommands" style='display: none;'>
                    <button class="btn btn-mini cancelRemove">
                        <i class="icon-remove"></i>
                        <%- data.i18next.t("editor.cancel") %>
                    </button>
                    <button class="btn btn-mini btn-warning confirmRemove">
                        <i class="icon-ok"></i>
                        <%- data.i18next.t("editor.delete") %>
                    </button>
                </div>
                <div class="pull-right mainCommands">
                    <button class="btn btn-mini remove">
                        <i class="icon-remove"></i>
                        <%- data.i18next.t("editor.delete") %>
                    </button>
                    <button class="btn btn-mini edit">
                        <i class="icon-edit"></i>
                        <%- data.i18next.t("editor.edit") %>
                    </button>
                </div>
            </div>
        </div>
        <div class="span5">
            <div class="compare-commands commands" style="display: none;">
                <button class="btn btn-mini edit">
                    <i class="icon-eye-open"></i>
                    <%- data.i18next.t("editor.th.displayedValue") %>
                </button>
            </div>
            <div class="preview-commands commands" style="display: none;">
                <div class="pull-right">
                    <span class="badge badge-success fallbackBadge <%- data.fallback.lng %>"></span>
                </div>
                <div class="pull-right">
                    <button class="btn btn-mini test">
                        <i class="icon-check"></i>
                        <%- data.i18next.t("editor.test") %>
                    </button>
                </div>
                <button class="btn btn-mini test">
                    <i class="icon-resize-horizontal"></i>
                    <%- data.i18next.t("editor.resourceItem.compare") %>
                </button>
            </div>
        </div>
    </div>
</div>

