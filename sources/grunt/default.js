module.exports = function(grunt){

    var defaultTasks = ['core', 'polymer'];
    if (!grunt.config.get('noWatch'))
    {
        defaultTasks.push('watch:core');
    }

    grunt.registerTask(
        'default',
        defaultTasks
    );
};
