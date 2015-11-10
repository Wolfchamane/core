module.exports = function(grunt){

    var defaultTasks = ['core', 'polymer', 'components', 'statics'];
    if (!grunt.config.get('noWatch'))
    {
        defaultTasks.push('watch:core');
    }

    grunt.registerTask(
        'default',
        defaultTasks
    );
};
