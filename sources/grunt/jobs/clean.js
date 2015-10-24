module.exports = function(grunt){
    grunt.config(
        'clean',
        {
            core: {
                options: {
                    force: true
                },
                src: '<%= directories.core.dest %>'
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-clean');
};
