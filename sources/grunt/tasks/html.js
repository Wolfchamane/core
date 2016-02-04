module.exports = function(grunt){

    var coreCodeTasks = ['concat:js', 'replace:core', 'concat:css'];
    grunt.registerTask(
        'html',
        coreCodeTasks
    );
};
