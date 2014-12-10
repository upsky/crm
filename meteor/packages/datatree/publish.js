/**
 * Created by kriz on 29.11.14.
 */

Meteor.publish('datatree:tree', function () {
   return DataTreeCollection.find();
});

// publish all tags to the client
Meteor.publish('datatree:tags', function () {
   return DataTreeTagsCollection.find();
});

// add root node
var root = { _id: '0' };

if (DataTreeCollection.find(root).count() === 0) {
   DataTreeCollection.insert(root);
}

