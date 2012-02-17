// models.js

var Template = Backbone.Model.extend({
    
    defaults: {
        username: "",
        code: ""
    },
    
    localStorage: new Store('template')
});

var Tweet = Backbone.Model.extend({
    
});