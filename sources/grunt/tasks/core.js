module.exports = function(grunt){

    var coreCodeTasks = ['clean:core', 'copy:index', 'concat:core', 'replace:core'];
    if (!grunt.config.get('noWatch'))
    {
        coreCodeTasks.push('watch:core');
    }
    grunt.registerTask(
        'core',
        coreCodeTasks
    );
};
