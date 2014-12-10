Package.describe({
  name: 'plugins',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('underscore');

  api.addFiles('plugins.js');

  api.export('Plugin');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('plugins');
  api.addFiles('plugins-tests.js');
});
