module.exports = function(grunt)
{
    grunt.config(
        'copy',
        {
            demo: {
                expand: true,
                src: ['<%= directories.demo.statics %>index.html'],
                dest: '<%= directories.dest.base %>',
                flatten: true
            },
            vendors: {
                expand: true,
                cwd: '<%= directories.bower.base %>',
                src: [
                    '!**/index.html',
                    '**/*.html',
                    '**/*.js',
                    '!**/demo/**',
                    '!**/test/**',
                    '!page/**'
                ],
                dest: '<%= directories.dest.vendors %>',
                flatten: false
            },
            components: {
                expand: true,
                cwd: '<%= directories.html.components %>',
                src: ['**/*.html'],
                dest: '<%= directories.dest.components %>',
                flatten: false,
                rename: function(dest, src)
                {
                    return dest + src.replace(/(.+)\/.+(\.html)/, '$1$2');
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-copy');
};
