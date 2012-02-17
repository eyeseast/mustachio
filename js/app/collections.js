// collection.js

// a collection that only fetches tweets
// data is stored in localstorage
var TweetList = Backbone.Collection.extend({
    
    localStorage: new Store('tweets'),
    
    model: Tweet
});