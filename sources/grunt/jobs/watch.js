module.exports = function(grunt)
{
    grunt.config(
        'watch',
        {
            sources:{
                files: [
                    '<%= directories.scripts %>**/*.js',
                    '<%= directories.components %>**/*.html'
                ],
                tasks: ['core', 'components']
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-watch');
};
