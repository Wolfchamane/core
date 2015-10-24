module.exports = function(grunt){

    var coreCodeTasks = ['clean:core', 'concat:core', 'replace:core'];
    if ((grunt.config.get('env') === 'local') && !grunt.config.get('noWatch'))
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
