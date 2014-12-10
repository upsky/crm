// Write your package code here!

Plugin.addType('task', {
    template: function () {
        return Template.Task;
    }
});

Plugin.addStatic({
        template: function () {
            return Template.TaskToolbar;
        }
    },
    'node-toolbar');

Template.Task.helpers({
    log: function () {
        console.log('%o', this);
    }
});

Template.Task.events({
    'click #rem': function () {
        this.node().removeThread(this);
        this.node().save();
    }
});

Template.TaskToolbar.events({
    'click #add': function () {
        var node = this;
        var thread = node.createThread('task');
        thread.data().name = 'New Task';
        node.save();
    }
});
