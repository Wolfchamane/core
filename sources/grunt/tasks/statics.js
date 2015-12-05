module.exports = function(grunt){

    var staticsTasks = ['copy:demo', 'replace:demo', 'concat:demo'];
    grunt.registerTask(
        'statics',
        staticsTasks
    );
};
