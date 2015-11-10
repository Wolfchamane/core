module.exports = function(grunt){

    var staticsTasks = ['copy:index', 'replace:statics'];
    grunt.registerTask(
        'statics',
        staticsTasks
    );
};
