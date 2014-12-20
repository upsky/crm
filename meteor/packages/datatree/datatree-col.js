/**
 * Created by kriz on 03.12.14.
 */

var transformNode = function (nodeData) {
    var node = NodeCache.getItem(nodeData._id);
    if (node)
        node._updateData(nodeData);
    else {
        node = new Node(nodeData);
        NodeCache.setItem(nodeData._id, node);
    }

    return node;
};

DataTreeCollection = new Meteor.Collection('datatree', {
    transform: transformNode
});

var transformTag = function (tagData) {
    var tag = new Tag(tagData);
    return tag;
};

DataTreeTagsCollection = new Meteor.Collection('tags', {
    transform: transformTag
});
