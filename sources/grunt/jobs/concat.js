module.exports = function(grunt){
    grunt.config(
        'concat',
        {
            js: {
                src: [
                    '<%= directories.vendors.jquery %>',
                    '<%= directories.bower.page %>',
                    '<%= directories.html.scripts %>' + '*.js',
                    '<%= directories.html.scripts %>' + 'request/**/*.js',
                    '<%= directories.html.scripts %>' + 'services/**/*.js',
                    '<%= directories.html.scripts %>' + 'models/**/*.js'
                ],
                dest: '<%= directories.dest.base %>core.js'
            },
            css: {
                src: ['<%= directories.html.styles %>**/*.css'],
                dest: '<%= directories.dest.base %>core.css'
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-concat');
};
