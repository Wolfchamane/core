module.exports = function(grunt)
{
    grunt.config(
        'watch',
        {
            core:{
                files: '<%= directories.core %>' + '**/*.js',
                tasks: ['concat:core', 'replace:core']
            }/*,
            tests:{
                files: folders.src.tests + '**!/!*.html',
                    tasks: ['copy:tests']
            }*/
        }
    );

    grunt.loadNpmTasks('grunt-contrib-watch');
};
