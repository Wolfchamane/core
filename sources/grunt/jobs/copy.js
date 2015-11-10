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
            },
            polymer: {
                expand: true,
                cwd: '<%= directories.bower %>',
                src: [
                    '!**/index.html',
                    '**/*.html',
                    '**/*.js',
                    '!**/demo/**',
                    '!**/test/**'
                ],
                dest: '<%= directories.dest %>',
                flatten: false,
                rename: function(dest, src)
                {
                    dest = dest + 'vendors/' + src;
                    return dest;
                }
            },
            components: {
                expand: true,
                cwd: '<%= directories.components %>',
                src: ['**/*.html'],
                dest: '<%= directories.dest %>',
                flatten: false,
                rename: function(dest, src)
                {
                    return dest + 'components/' + src;
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-copy');
};
