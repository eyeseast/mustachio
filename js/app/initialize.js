jQuery(function($) {
    window.template = new Template({ id: 1 }); // set an id to keep our singleton consistent
    window.tweets = new TweetList();
    window.editor = new Editor({ model: template, collection: tweets });
});