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

    grunt.registerTask(
        'backend',
        [
            'php:code',
            'watch:php'
        ]
    );
};
