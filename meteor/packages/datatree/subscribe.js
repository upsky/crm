/**
 * Created by kriz on 08.12.14.
 */

Meteor.subscribe('datatree:tags');
TreeSubscription = Meteor.subscribe('datatree:tree');

Deps.autorun(function () {
    Tags = DataTreeTagsCollection.find().fetch();
});
