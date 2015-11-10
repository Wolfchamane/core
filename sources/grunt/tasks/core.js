module.exports = function(grunt){

    var coreCodeTasks = ['clean:core', 'concat:core', 'replace:core'];
    grunt.registerTask(
        'core',
        coreCodeTasks
    );
};
