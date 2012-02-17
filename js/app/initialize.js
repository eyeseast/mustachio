jQuery(function($) {
    window.template = new Template();
    window.things = new Things();
    window.editor = new Editor({ model: template, collection: things });
});