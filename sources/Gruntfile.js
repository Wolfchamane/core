module.exports = function(grunt){

	//Read package.json
	var config = grunt.file.readJSON('package.json');

	//Set environment
	var env = grunt.option('env') || 'local';
	if (env === 'live'){
		config.directories.dest = config.directories.dist;
	}
	config.env = env;

	//Set version
	config.version += '.' + (new Date()).getTime().toString().substr(0,7);

    //Set name as 'Some Nice String' format
    config.name = config.name.split('-');
    config.name.forEach(function(text){
        config.name[config.name.lastIndexOf(text)] = text.charAt(0).toUpperCase() + text.slice(1);
    });
    config.name = config.name.join(' ');

	//Init config
	grunt.initConfig(config);

	grunt.loadTasks('grunt/jobs/');
	grunt.loadTasks('grunt/tasks/');

	/*grunt.initConfig({
		,
		copy: {
			tests: {
				expand: true,
				src: folders.src.tests+'**!/!*.html',
				dest: folders.dest.tests
			}
		},


	});



grunt.loadNpmTasks('grunt-contrib-copy');*/




};