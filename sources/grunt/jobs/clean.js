module.exports = function(grunt){
    grunt.config(
        'clean',
        {
            dest: {
                options: {
                    force: true
                },
                src: '<%= directories.dest %>'
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-clean');
};
