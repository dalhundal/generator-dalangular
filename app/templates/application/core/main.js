require.config({
	paths: {
		'domReady': '../../libs/bower_components/requirejs-domready/domReady',
		'app.viewTemplates': '../build/viewTemplates',
		'app.directiveTemplates': '../build/directiveTemplates',
		'app.controllers': '../controllers/_index',
		'app.directives': '../directives/_index',
		'app.filters': '../filters/_index',
		'app.services': '../services/_index',
	},
	deps: ['./bootstrap']
});