Package.describe({
  name: 'wiki',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('plugins');
  api.use('templating');
  api.use('mquandalle:jade');

  api.addFiles('wiki.jade');
  api.addFiles('wiki.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('wiki');
  api.addFiles('wiki-tests.js');
});
