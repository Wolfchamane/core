module.exports = function(grunt){
    grunt.config(
        'concat',
        {
            core: {
                src: [
                    '<%= directories.jquery %>',
                    '<%= directories.scripts %>' + 'core.js',
                    '<%= directories.scripts %>' + 'request/**/*.js',
                    '<%= directories.scripts %>' + 'services/**/*.js',
                    '<%= directories.scripts %>' + 'models/**/*.js'
                ],
                dest: '<%= directories.dest %>core.js'
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-concat');
};
