module.exports = function(grunt)
{
    grunt.config(
        'copy',
        {
            index: {
                expand: true,
                src: ['<%= directories.statics %>index.html'],
                dest: '<%= directories.dest %>',
                flatten: true
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-copy');
};
