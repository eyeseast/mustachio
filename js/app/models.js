// models.js

var Template = Backbone.Model.extend({
    
    defaults: {
        url: "",
        code: ""
    },
    
    localStorage: new Store('template')
});