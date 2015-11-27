module.exports = function(grunt)
{
	var defaultTasks = ['clean:dest', 'html', 'components', 'vendors', 'statics'];
    if (!grunt.config.get('noWatch'))
    {
        defaultTasks.push('watch:sources');
    }
    grunt.registerTask(
        'demo',
        defaultTasks
    );
};