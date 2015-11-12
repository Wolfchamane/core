module.exports = function(grunt){

    var coreCodeTasks = ['concat:core', 'replace:core'];
    grunt.registerTask(
        'core',
        coreCodeTasks
    );
};
