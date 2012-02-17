// collection.js

// a collection that only fetches
// data is stored in localstorage
var Things = Backbone.Collection.extend({
    
    localStorage: new Store('things')
});