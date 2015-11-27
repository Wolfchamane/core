module.exports = function(grunt){

    var staticsTasks = ['copy:demo', 'replace:demo'];
    grunt.registerTask(
        'statics',
        staticsTasks
    );
};
