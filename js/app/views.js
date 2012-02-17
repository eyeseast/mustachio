// views.js

var Editor = Backbone.View.extend({
    
    el: '#editor',
    
    initialize: function(options) {
        _.bindAll(this);
        this.codemirror();
    },
    
    codemirror: function() {
        this.mirror = CodeMirror.fromTextArea(this.$('.template')[0], {mode: "mustache"});
    }
});