module.exports = function(grunt){
    grunt.config(
        'concat',
        {
            core: {
                src: [
                    '<%= directories.core.vendors.jquery %>',
                    '<%= directories.core.scripts %>' + 'core.js',
                    '<%= directories.core.scripts %>' + 'request/**/*.js',
                    '<%= directories.core.scripts %>' + 'services/**/*.js',
                    '<%= directories.core.scripts %>' + 'models/**/*.js'
                ],
                dest: '<%= directories.core.dest %>'
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-concat');
};
