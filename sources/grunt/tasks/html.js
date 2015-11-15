module.exports = function(grunt){

    var coreCodeTasks = ['concat:html', 'replace:core'];
    grunt.registerTask(
        'html',
        coreCodeTasks
    );
};
