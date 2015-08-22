module.exports = function(grunt)
{
    grunt.config(
        'watch',
        {
            core:{
                files: '<%= directories.core.scripts %>**/*.js',
                tasks: ['concat:core', 'replace:core']
            },
            php:{
                files: '<%= directories.backend.src %>**/*.php',
                tasks: ['php:code']
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-watch');
};
