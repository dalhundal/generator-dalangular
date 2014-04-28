'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var DalangularGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},

	askFor: function () {
		var done = this.async();

		// have Yeoman greet the user
		this.log(this.yeoman);

		// replace it with a short and sweet description of your generator
		this.log(chalk.magenta('You\'re using the fantastic Dalangular generator.'));

		var prompts = [{
			name: 'appName',
			message: 'What would you like to call this app?',
			default: 'MyApp'
		},{
			type: 'confirm',
			name: 'gitInit',
			message: 'Would you like to initialise a git repository for this app?',
			default: true
		}];

		this.prompt(prompts, function (props) {
			for (var i in props) this[i] = props[i];
			done();
		}.bind(this));
	},

	app: function () {
		this.template('_package.json', 'package.json');
		this.template('_bower.json', 'bower.json');
		this.template('_README.md', 'README.md');
		this.template('_gulpfile.js', 'gulpfile.js');
		this.copy('gulpfile.json', 'gulpfile.json');
		this.copy('bowerrc', '.bowerrc');
		this.copy('gitignore', '.gitignore');
	},

	projectfiles: function () {
		this.copy('editorconfig', '.editorconfig');
		this.copy('jshintrc', '.jshintrc');
	},

	scaffolding: function() {
		this.directory('application','application');
	},

	application: function() {
		this.template('_index.html','index.html');
	},

	git: function() {
		if (this.gitInit) {
			var addFilesToGit = [
				'.gitignore',
				'.bowerrc',
				'.editorconfig',
				'.jshintrc',
				'README.md',
				'application',
				'bower.json',
				'gulpfile.js',
				'gulpfile.json',
				'index.html',
				'package.json'
			];
			console.log("Initialising git repository");
			var exec = require('child_process').exec;
			exec('git init',function(error, stdout) {
				if (error) return console.log("Failed to intialise git repository");
				exec('git add '+addFilesToGit.join(' '),function(error, stdout) {
					if (error) return console.log("Failed to add .gitignore to repository");
					exec('git commit -va -m "Initial commit"',function(error,stdout) {
						if (error) return console.log("Failed to create inital commit");
						console.log("Git repo initialised with initial commit");
					});
				});
			});
		};
	}

});

module.exports = DalangularGenerator;