Package.describe({
  name: 'jscache',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.addFiles('cache.js');
  api.addFiles('jscache.js');

  api.export('JsCache');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('jscache');
  api.addFiles('jscache-tests.js');
});
