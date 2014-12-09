// Write your package code here!

function find (id) {
    check(id, String);

    return DataTreeCollection.findOne({ _id: id });
}


function removeChildrenRec (node) {
    if (!node.hasChildNodes())
        return;

    node.children().forEach(removeChildrenRec);

    node._data.children.forEach(function (childId) {
        DataTreeCollection.remove({ _id: childId });
    });
}

// TODO move to the server
function remove(node) {
    DataTreeCollection.find({ children: node.id() })
        .forEach(function (node) {
            node.removeChild(node);
        });
    removeChildrenRec(node);
    DataTreeCollection.remove({ _id: node.id() });
}

function onChange(callback) {
    DataTreeCollection.find().observe({
        added: callback,
        removed: callback
    });
}

function getRoot () {
    var root = find('0');
    // create root
    if (typeof root === 'undefined') {
        DataTreeCollection.insert({ _id: '0' });
        root = find('0');
    }

    return root;
}

function createTag (name, id) {
    check(name, String);
    check(id, Match.Optional(String));

    var tagData = { name: name };
    if (id)
        tagData._id = id;

    var tagId = DataTreeTagsCollection.insert(tagData); // TODO unificate
    var tag = DataTreeTagsCollection.findOne(tagId);

    // update tags collection
    Tags[tag.id()] = tag;

    return tag;
}

// DataTree
DataTree = {
    find: find,
    remove: remove,
    onChange: onChange,
    root: getRoot,

    createTag: createTag,

    Node: Node,
    Tag: Tag,
    Thread: Thread
};

