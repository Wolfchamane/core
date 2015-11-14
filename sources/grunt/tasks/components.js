module.exports = function(grunt){

    var componentsTasks = ['copy:components', 'replace:components'];
    grunt.registerTask(
        'components',
        componentsTasks
    );
};
