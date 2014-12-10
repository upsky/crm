/**
 * Created by kriz on 08.12.14.
 */


Router.route('/tree-test', function () {
    this.render('TreeTest');
});

Router.route('/main', {
    waitOn: function () {
        return DataTree;
    },
    action: function () {
        if (this.ready())
            this.render('Main');
    }
});