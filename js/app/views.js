// views.js

var Editor = Backbone.View.extend({
    
    el: '#editor',
    
    events: {
        'click #fetch' : 'fetch',
        'submit'       : 'fetch',
        'click #render': 'render'
    },
    
    initialize: function(options) {
        _.bindAll(this);
        Backbone.ModelBinding.bind(this);
        var mirror = this.codemirror();
        this.collection.on('reset', this.render);
        this.model.on('change:code', this.compile);
        this.model.fetch({ 
            success: function(model, attributes) {
                mirror.setValue(model.get('code'));
            }
        });
    },
    
    codemirror: function() {
        var model = this.model;
        this.mirror = CodeMirror.fromTextArea(this.$('.template')[0], {
            mode: "mustache",
            lineNumbers: true,
            value: model.get('code'),
            onChange: function(editor, change) {
                model.save({ code: editor.getValue() });
            }
        });
        return this.mirror;
    },
    
    compile: function(model, code, options) {
        try {
            this.template = Hogan.compile(this.model.get('code'));
            this.showMessage('Compiled successfully!', 'alert-info')
        } catch(e) {
            this.showMessage(e.message, 'alert-error');
        }
        // always return a template
        return this.template || Hogan.compile("");
    },
    
    fetch: function(e) {
        e.preventDefault();
        var url = this.getUrl(),
            model = this.model,
            collection = this.collection,
            view = this;
        
        if (!url) return;
        jQuery.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                collection.reset(data);
            },
            
            error: function(options, status) {
                this.showMessage(status, 'alert-error');
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
                include_entities: true,
                count: 5
            };
        return base + jQuery.param(params);
    },
    
    render: function() {
        this.renderData();
        var template = this.template || this.compile()
            data = this.collection.toJSON();
        
        $('#rendered').html(template.render({ tweets: data }));
        return this;
    },
    
    renderData: function() {
        var data = this.collection.toJSON();
        $('#raw-data').text(JSON.stringify(data, undefined, 2));
    },
    
    showMessage: function(message, className) {
        this.$('#message')
            .removeClass()
            .addClass('alert')
            .addClass(className)
            .text(message);
    }
    
});