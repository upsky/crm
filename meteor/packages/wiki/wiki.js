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

Template.WikiToolbar.events({
    'click #add-wiki': function () {
        var node = this;
        var thread = node.createThread('wiki');
        thread.data().name = 'New Wiki';
        thread.data().content = 'Some content';
        node.save();
    }
});
