// Write your package code here!

Plugin.addType('task', {
    template: function () {
        return Template.Task;
    }
});

Plugin.addStatic(
    {
        template: function () {
            return Template.TaskTreeNode
        },
        name: function (node) {
            var thread = _.find(node.threads(), function (thread) {
                return thread.type() === 'task';
            });
            return thread ? thread.data().name : null;
        }
    },
    'tree'
);

Plugin.addStatic({
        template: function () {
            return Template.TaskToolbar;
        }
    },
    'node-toolbar');

Template.Task.events({
    'click #remove': function () {
        this.node().removeThread(this);
        this.node().save();
    },
    'click #edit': function () {
        this.isEditing.set(true);
    },
    'submit form': function (e) {
        e.preventDefault();

        var form = $(e.target).serializeArray();

        _.each(form, function(item) {
            this.data()[item.name] = item.value;
        }, this);

        delete this.isNew;
        this.node().save();

        this.isEditing.set(false);
    }
});

Template.TaskToolbar.events({
    'click #add': function () {
        var node = this;
        var thread = node.createThread('task');
        thread.data().name = 'New Task';
        thread.data().content = 'Some content';
        thread.isNew = true;

        node.save();
    }
});
