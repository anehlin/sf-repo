
angular.module('App', [
    'App.Customer',
    'App.ErrorReports',
    'App.ReportGenerator',
    'App.Templates',
    'App.sfGuardAuth',
    'Components.Templates',
    'App.Utils',
    'predefinedCheckboxes',
    'App.SnmpData'
])

.config(function($httpProvider) {
    'use strict';
    // For symfony to know it's an Ajax request:
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});

