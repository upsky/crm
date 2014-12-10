Package.describe({
  name: 'tasks',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('plugins');
  api.use('templating');
  api.use('mquandalle:jade');

  api.addFiles('tasks.jade');
  api.addFiles('tasks.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('tasks');
  api.addFiles('tasks-tests.js');
});
