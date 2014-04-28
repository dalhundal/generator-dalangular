define([
	'app.controllers',
	'app.directives',
	'app.directiveTemplates',
	'app.filters',
	'app.services',
	'app.viewTemplates'
], function () {
	'use strict';

	var app = angular.module('app',[
		'app.controllers',
		'app.directives',
		'app.filters',
		'app.services',
		'app.viewTemplates',
		'app.directiveTemplates',
		/* ==== */
		'ui.router'
		/* ==== */
	]);

	app.config(function($sceProvider) {

		// Disable Angular's Secure Contextual Escaping (see http://docs.angularjs.org/api/ng/provider/$sceProvider)
		$sceProvider.enabled(false);

	});

	return app;
});
