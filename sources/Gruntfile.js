module.exports = function(grunt){

	//Read package.json
	var config = grunt.file.readJSON('package.json');

	//Set environment
	var env = grunt.option('env') || 'local';
	if (env === 'live')
	{
		config.directories.dest.base = config.directories.dest.dist;
	}
	config.env = env;

	//Flag if use watchers or not
	config.noWatch = !!grunt.option('noWatch') || false;

	//Set version
	config.appVersion += '.' + (new Date()).getTime().toString().substr(0,7);

    //Set name as 'Some Nice String' format
    config.name = config.name.split('-');
    config.name.forEach(function(text){
        config.name[config.name.lastIndexOf(text)] = text.charAt(0).toUpperCase() + text.slice(1);
    });
    config.name = config.name.join(' ');

    //log
    console.log('@PROJECT: ' + config.name);
    console.log('@Version: ' + config.appVersion);
    console.log('@Environment: ' + config.env);
    console.log('@Watchers? ' + (!!config.noWatch ? 'false' : 'true'));
    console.log('');

	//Init config
	grunt.initConfig(config);

	grunt.loadTasks('grunt/jobs/');
	grunt.loadTasks('grunt/tasks/');
	grunt.loadTasks('grunt/');
};