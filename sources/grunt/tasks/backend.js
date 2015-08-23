module.exports = function(grunt)
{
    grunt.registerTask(
        'php:replace',
        [
            'replace:ddbb',
            'replace:models'
        ]
    );

    grunt.registerTask(
        'php:code',
        [
            'copy:php',
            'php:replace'
        ]
    );

    var backendTasks = ['php:code'];
    if (grunt.config.get('env') === 'local')
    {
        backendTasks.push('watch:php');
    }

    grunt.registerTask(
        'backend',
        backendTasks
    );
};
