/**
 * Created by kriz on 03.12.14.
 */

var transformNode = function (nodeData) {
    var node = new Node(nodeData);
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
