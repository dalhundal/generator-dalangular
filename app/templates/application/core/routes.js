define(['./app'], function (app) {
	'use strict';
	return app.config(function($stateProvider, $urlRouterProvider) {

		/* ===== LAYOUTS ===== */

		$stateProvider.state('[plain]', {
			templateUrl: 'application/views/layouts/plain.html'
		});

		/* ====== ROUTES =====*/

		$stateProvider.state('helloworld',{
			url: '^/hello/world',
			templateUrl: 'application/views/hello/world.html',
			controller: 'hello/world',
			parent: '[plain]'
		});

		/* ===== OTHERWISE ===== */

		$urlRouterProvider.otherwise('hello/world');

	});
});
