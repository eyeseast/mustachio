// models.js

var Template = Backbone.Model.extend({
    
    defaults: function() {
        return {
            username: "",
            code: $('#default-template').html().trim()
        }
    },
    
    localStorage: new Store('template')
    
});

var Tweet = Backbone.Model.extend({
    
});