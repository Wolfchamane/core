module.exports = function(grunt){
    grunt.registerTask(
        'core:code',
        [
            'concat:core',
            'replace:core',
            'watch:core'
        ]
    );
    grunt.registerTask(
        'core',
        [
            'core:code'
        ]
    );
};
