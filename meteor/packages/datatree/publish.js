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

if ( !DataTree.root() ) {
   DataTree._createRoot();
}

DataTreeCollection.find().forEach(function (node) {
   var updated = false;
   _.forEach(node.threads(), function (thread) {
      if (!thread.id()) {
         thread._data._id = Random.id();
         updated = true;
      }
   });

   if (updated)
      node.save();
});

