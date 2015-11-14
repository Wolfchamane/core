module.exports = function(grunt){

    var defaultTasks = ['core', 'components', 'statics', 'vendors'];
    if (!grunt.config.get('noWatch'))
    {
        defaultTasks.push('watch:sources');
    }

    grunt.registerTask(
        'default',
        defaultTasks
    );
};
