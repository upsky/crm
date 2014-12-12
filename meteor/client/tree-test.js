/**
 * Created by kriz on 08.12.14.
 */

var currentNode = new ReactiveVar(null);
var selectedNode = function () {
    return DataTree.find(currentNode.get() || '');
};

Template.TreeContent.rendered = function () {
    var cbs = Plugin._staticCallbacks('tree');

    var map = function (node) {
        return {
            text: cbs[0].name(node) || 'id: ' + node.id(),
            node: node,
            nodes: node.hasChildNodes() ? _.map(node.children(), map) : undefined
        };
    };

    Deps.autorun(function () {
        var root = DataTree.root();
        var data = [map(root)];

        Tracker.afterFlush(function () {
            var tree = $('#tree-content');
            //tree.treeview('remove');
            tree.treeview({
                data: data,
                onNodeSelected: function (event, node) {
                    currentNode.set(node.node.id());
                },
                levels: 4
            });
        });
    });
};

Template.TreeContent.events({
    'click #add': function () {
        var selected = selectedNode();
        if (selected == null)
            return;

        console.log('add');

        selected.createChild();
    },

    'click #rem': function () {
        var selected = selectedNode();
        if (selected == null)
            return;

        DataTree.remove(selected);
    }
});

Template.NodeContent.helpers({
    nodeSelected: function () {
        return selectedNode() !== null;
    },

    currentNode: function () {
        return selectedNode();
    }
});


Template.NodeThread.helpers({
    showThread: function () {
        var cb = Plugin._threadCallbacks(this.type());
        var template = cb ? cb.template() : Template.UnknownThread;
        return template;
    }
});

Template.NodeToolbar.helpers({
    toolbars: function () {
        var cb = Plugin._staticCallbacks('node-toolbar');
        return cb;
    },

    templateName: function () {
        if (this)
            return this.template().viewName.substring('Template.'.length);//Blaze.render(Blaze.With(this, function () { return this.template() }));
        else
            return 'UnknownThread';
    }
});