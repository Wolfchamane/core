module.exports = function(grunt){

    var defaultTasks = ['clean:dest', 'core', 'polymer', 'components', 'statics'];
    if (!grunt.config.get('noWatch'))
    {
        defaultTasks.push('watch:html');
    }

    grunt.registerTask(
        'default',
        defaultTasks
    );
};
