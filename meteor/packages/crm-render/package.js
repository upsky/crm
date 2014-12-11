Package.describe({
  name: 'crm-render',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('underscore');
  api.use('mquandalle:jade');

  api.addFiles('crm-render.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('crm-render');
  api.addFiles('crm-render-tests.js');
});
