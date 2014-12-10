Package.describe({
  name: 'people',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('people.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('people');
  api.addFiles('people-tests.js');
});
