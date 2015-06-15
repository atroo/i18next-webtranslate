<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title">
                    <%- data.i18next.t("project:create") %>
                </h4>
            </div>
            <div class="modal-body">
                <form class="form-inline">
                    <h6><%- data.i18next.t("project:name") %>:</h6>
                    <input type="text">
                    <div class="wt-s-namespaces"></div>
                    <div class="wt-s-languages"></div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">
                    <%- data.i18next.t("editor.cancel") %>
                </button>
                <button type="button" class="btn btn-primary wt-s-save">
                    <%- data.i18next.t("editor.send") %>
                </button>
            </div>
        </div>
    </div>
    
</div>