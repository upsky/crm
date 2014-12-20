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
    'tree'
);

Plugin.addStatic({
        template: function () {
            return Template.PeopleToolbar;
        }
    },
    'node-toolbar');

Template.People.created = function () {
    this.isEditing = ReactiveFuncVar(this.data.isNew);
};

Template.People.events({
    'click #remove': function () {
        this.node().removeThread(this);
        this.node().save();
    },
    'click #edit': function () {
        Template.instance().isEditing.set(true);
    },
    'click #cancel': function () {
        this.node().removeThread(this);
        this.node().save();
    },
    'submit form': function (e) {
        e.preventDefault();

        var form = $(e.target).serializeArray();

        _.extend(this.data(), form);

        delete this.isNew;
        this.node().save();

        Template.instance().isEditing.set(false);
    }
});

Template.PeopleToolbar.events({
    'click #add': function () {
        var node = this;
        var thread = node.createThread('people');
        _.extend(thread.data(), {
            firstname: '',
            lastname: '',
            email: 'example@example.com'
        });
        thread.isNew = true;
        node.save();
    }
});
