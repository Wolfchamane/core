module.exports = function(grunt){
    grunt.config(
        'concat',
        {
            core: {
                src: [
                    '<%= directories.vendors.jquery %>',
                    '<%= directories.core %>' + '_lib.js',
                    '<%= directories.core %>' + 'core.js',
                    '<%= directories.core %>' + 'requestManager.js',
                    '<%= directories.core %>' + 'models/*.js'
                ],
                dest: '<%= directories.dest %>'
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-concat');
};
