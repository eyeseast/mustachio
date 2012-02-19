// models.js

var Template = Backbone.Model.extend({
    
    defaults: function() {
        return {
            username: "",
            code: $('#default-template').html().trim()
        }
    },
    
    localStorage: new Store('template'),
    
    initialize: function(attributes, options) {
        this.on('change:code', function(model, code, attributes) {
            if (!code.trim()) {
                model.set({ code: model.defaults()['code']});
            }
        });
    }
    
});

var Tweet = Backbone.Model.extend({
    
    initialize: function(attributes, options) {
        var changes = {};
        changes.text = twttr.txt.autoLink(attributes.text);
        if (attributes.rewteeted_status) {
            changes.retweeted_status.text = twttr.txt.autoLink(changes.retweeted_status.text);
        }
        this.set(changes);
    }
});