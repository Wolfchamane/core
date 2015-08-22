module.exports = function(grunt)
{
    grunt.config(
        'copy',
        {
            'php': {
                expand: true,
                cwd: '<%= directories.backend.src %>',
                src: ['**/*.php'],
                dest: '<%= directories.backend.dest %>',
                flatten: true,
                rename: function(dest, src){
                    var fullDest = dest + src;
                    console.log('Coping: "' + src + '" to "' + fullDest + '"');
                    return fullDest;
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-copy');
};
