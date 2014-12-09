Package.describe({
  name: 'datatree',
  summary: 'DataTree package',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.use('deps');
  api.use('underscore');
  api.use('check');

  api.versionsFrom('1.0');
  api.addFiles('tags.js');
  api.addFiles('thread.js');
  api.addFiles('node.js');
  api.addFiles('datatree-col.js');
  api.addFiles('datatree.js');
  api.addFiles('subscribe.js', 'client');
  api.addFiles('publish.js', 'server');

  api.export('DataTree');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('datatree');
  api.addFiles('datatree-tests.js');
});
