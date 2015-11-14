module.exports = function(grunt){

    var defaultTasks = ['html', 'components', 'statics', 'vendors'];
    if (!grunt.config.get('noWatch'))
    {
        defaultTasks.push('watch:sources');
    }

    grunt.registerTask(
        'default',
        defaultTasks
    );
};
