// Write your package code here!

Plugin.addType('wiki', {
    template: function () {
        return Template.Wiki;
    }
});

Plugin.addStatic({
        template: function () {
            return Template.WikiToolbar;
        }
    },
    'node-toolbar');

Template.Wiki.events({
    'click #remove-wiki': function () {
        this.node().removeThread(this);
        this.node().save();
    },
    'click #edit-wiki': function () {
        this.setEditState(true);
    },
    'submit form': function (e) {
        e.preventDefault();

        var form = $(e.target).serializeArray();

        _.each(form, function (item) {
            this.data()[item.name] = item.value;
        }, this);

        this.node().save();

        this.setEditState(false);
    }
});

Template.MarkdownEditor.rendered = function () {
    this.$('textarea').markdown({
        disabledButtons: ['cmdPreview'],
        hiddenButtons: ['cmdPreview']
    });
};

Template.WikiToolbar.events({
    'click #add-wiki': function () {
        var node = this;
        var thread = node.createThread('wiki');
        thread.data().content = 'Some content';
        node.save();
    }
});
