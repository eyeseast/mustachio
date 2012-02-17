// views.js

var Editor = Backbone.View.extend({
    
    el: '#editor',
    
    initialize: function(options) {
        _.bindAll(this);
        this.model.fetch();
        this.codemirror();
        Backbone.ModelBinding.bind(this);
    },
    
    codemirror: function() {
        var model = this.model;
        this.mirror = CodeMirror.fromTextArea(this.$('.template')[0], {
            mode: "mustache",
            lineNumbers: true,
            value: model.get('code'),
            onChange: function(editor, change) {
                model.set({ code: editor.getValue() });
                model.save();
            }
        });
    }
});