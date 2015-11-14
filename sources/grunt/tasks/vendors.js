module.exports = function(grunt){

    var polymerTasks = ['copy:vendors'];
    grunt.registerTask(
        'vendors',
        polymerTasks
    );
};
