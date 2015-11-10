module.exports = function(grunt){

    var coreCodeTasks = ['clean:core', 'copy:index', 'concat:core', 'replace:core'];
    grunt.registerTask(
        'core',
        coreCodeTasks
    );
};
