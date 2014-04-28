define([
	'require',
	'app',
	'routes',
], function(require, ng) {
	'use strict';
	require(['domReady!'], function(document) {
		angular.bootstrap(document, ['app']); 
	});
});