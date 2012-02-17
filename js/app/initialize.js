jQuery(function($) {
    window.template = new Template();
    window.tweets = new TweetList();
    window.editor = new Editor({ model: template, collection: tweets });
});