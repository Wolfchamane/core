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
            vendors: {
                expand: true,
                cwd: '<%= directories.bower %>',
                src: [
                    '!**/index.html',
                    '**/*.html',
                    '**/*.js',
                    '!**/demo/**',
                    '!**/test/**',
                    '!**/index.js'
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
                    src = src.replace(/(.+)\/.+(\.html)/, '$1$2');
                    dest = dest + 'components/' + src;
                    return dest;
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-copy');
};
