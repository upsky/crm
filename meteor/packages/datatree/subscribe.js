/**
 * Created by kriz on 08.12.14.
 */

Meteor.subscribe('datatree:tags');
Meteor.subscribe('datatree:tree');

Deps.autorun(function () {
    Tags = DataTreeTagsCollection.find().fetch();
});
