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

Template.Task.created = function () {
  var inst = Template.instance();
};

Template.Task.helpers({
    log: function () {
        console.log('%o', this);
    }
});

Template.Task.events({
    'click #remove': function () {
        this.node().removeThread(this);
        this.node().save();
    },
    'click #edit': function () {
        this.setEditState(true);
    },
    'submit form': function (e) {
        e.preventDefault();

        var form = $(e.target).serializeArray();

        _.each(form, function(item) {
            this.data()[item.name] = item.value;
        }, this);

        this.node().save();
    }
});

Template.TaskToolbar.events({
    'click #add': function () {
        var node = this;
        var thread = node.createThread('task');
        thread.data().name = 'New Task';
        thread.data().content = 'Some content';
        node.save();
    }
});
