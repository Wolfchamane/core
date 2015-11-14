module.exports = function(grunt){

    var coreCodeTasks = ['clean:dest', 'concat:html', 'replace:core'];
    grunt.registerTask(
        'html',
        coreCodeTasks
    );
};
