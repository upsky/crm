/**
 * Created by kriz on 08.12.14.
 */


Router.route('/tree-test', function () {
    this.render('TreeTest');
});

Router.route('/', {
    waitOn: function () {
        return DataTree;
    },
    action: function () {
        if (this.ready())
            this.render('Main');
    }
});

Router.route('/main', function () {
    this.redirect('/');
});

