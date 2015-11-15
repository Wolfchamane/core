module.exports = function(grunt)
{
    grunt.config(
        'watch',
        {
            sources:{
                files: [
                    '<%= directories.html.scripts %>**/*.js',
                    '<%= directories.html.components %>**/*.html'
                ],
                tasks: ['html', 'components']
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-watch');
};
