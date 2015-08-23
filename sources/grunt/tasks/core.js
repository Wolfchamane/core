module.exports = function(grunt){

    var coreCodeTasks = ['concat:core', 'replace:core'];
    if (grunt.config.get('env') === 'local')
    {
        coreCodeTasks.push('watch:core');
    }

    grunt.registerTask(
        'core:code',
        coreCodeTasks
    );
    grunt.registerTask(
        'core',
        [
            'core:code'
        ]
    );
};
