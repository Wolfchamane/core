module.exports = function(grunt)
{
    grunt.config(
        'watch',
        {
            core:{
                files: '<%= directories.scripts %>**/*.js',
                tasks: ['concat:core', 'replace:core']
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-watch');
};
