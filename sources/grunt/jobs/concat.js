module.exports = function(grunt){
    grunt.config(
        'concat',
        {
            html: {
                src: [
                    '<%= directories.vendors.jquery %>',
                    '<%= directories.bower.page %>',
                    '<%= directories.html.scripts %>' + '*.js',
                    '<%= directories.html.scripts %>' + 'request/**/*.js',
                    '<%= directories.html.scripts %>' + 'services/**/*.js',
                    '<%= directories.html.scripts %>' + 'models/**/*.js'
                ],
                dest: '<%= directories.dest.base %>core.js'
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-concat');
};
