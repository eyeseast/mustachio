// views.js

var Editor = Backbone.View.extend({
    
    el: '#editor',
    
    events: {
        'click #fetch' : 'fetch'
    },
    
    initialize: function(options) {
        _.bindAll(this);
        this.model.fetch();
        this.codemirror();
        this.collection.on('reset', this.renderData);
        Backbone.ModelBinding.bind(this);
    },
    
    codemirror: function() {
        var model = this.model;
        this.mirror = CodeMirror.fromTextArea(this.$('.template')[0], {
            mode: "mustache",
            lineNumbers: true,
            value: model.get('code'),
            onChange: function(editor, change) {
                model.set({ code: editor.getValue() });
                model.save();
            }
        });
    },
    
    fetch: function() {
        var url = this.getUrl(),
            model = this.model;
            collection = this.collection;
        
        if (!username) return;
        jQuery.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                console.log('Fetched data from ' + url);
                collection.reset(data);
            },
            
            error: function(options, status) {
                console.log('Error! ' + status);
            }
        });
    },
    
    getUrl: function() {
        var username = this.model.get('username');
        if (!username) return;
        var base = 'https://api.twitter.com/1/statuses/user_timeline.json?',
            params = {
                screen_name: username,
                include_rts: true,
                include_entities: true
            };
        return base + jQuery.param(params);
    },
    
    renderData: function() {
        var data = this.collection.toJSON();
        $('#raw-data').text(JSON.stringify(data, undefined, 2));
    }
});