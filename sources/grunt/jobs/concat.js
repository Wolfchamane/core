module.exports = function(grunt){
    grunt.config(
        'concat',
        {
            core: {
                src: [
                    '<%= directories.core.vendors.jquery %>',
                    '<%= directories.core.scripts %>' + '_lib.js',
                    '<%= directories.core.scripts %>' + 'core.js',
                    '<%= directories.core.scripts %>' + 'requestManager.js',
                    '<%= directories.core.scripts %>' + 'models/*.js'
                ],
                dest: '<%= directories.core.dest %>'
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-concat');
};
