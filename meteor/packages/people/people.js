// Write your package code here!

// Write your package code here!

Plugin.addType('people', {
    template: function () {
        return Template.People;
    }
});

Plugin.addStatic(
    {
        template: function () {
            return Template.PeopleTreeNode
        },
        name: function (node) {
            var thread = _.find(node.threads(), function (thread) {
                return thread.type() === 'people';
            });
            return thread ? thread.data().firstname + ' ' + thread.data().lastname : null;
        }
    },
    'people'
);

Plugin.addStatic({
        template: function () {
            return Template.PeopleToolbar;
        }
    },
    'node-toolbar');

Template.People.events({
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

        this.setEditState(false);
    }
});

Template.PeopleToolbar.events({
    'click #add': function () {
        var node = this;
        var thread = node.createThread('people');
        thread.data({
            firstname: 'Unknown firstname',
            lastname: 'Unknown lastname',
            email: 'example@example.com'
        });
        node.save();
    }
});
