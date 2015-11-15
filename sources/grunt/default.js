module.exports = function(grunt){

    var defaultTasks = ['clean:dest', 'html', 'components', 'statics', 'vendors'];
    if (!grunt.config.get('noWatch'))
    {
        defaultTasks.push('watch:sources');
    }

    grunt.registerTask(
        'default',
        defaultTasks
    );
};
