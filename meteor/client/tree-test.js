/**
 * Created by kriz on 08.12.14.
 */

Template.TreeTest.helpers({
    root: function () {
        var root = DataTree.root();
        console.log('%o', root);
    },
    name: function () {
        var root = DataTree.root();
        return typeof root != 'undefined' ? root.data().name : 'noname';
    }
});
