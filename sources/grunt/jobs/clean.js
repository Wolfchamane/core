module.exports = function(grunt){
    grunt.config(
        'clean',
        {
            dest: {
                options: {
                    force: true
                },
                src: '<%= directories.dest.base %>'
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-clean');
};
