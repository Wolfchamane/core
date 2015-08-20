module.exports = function(grunt){
    grunt.config(
        'replace',
        {
            /*php: {
                src: [folders.src.backend+'/!*.php'],
                dest: folders.dest.backend,
                replacements: replacements
            },*/
            core:{
                src: '<%= directories.dest %>',
                replacements: [
                    {
                        from: '_HOST_',
                        to: grunt.template.process('<%= environments.' + grunt.config.get('env') + '.host %>')
                    },
                    {
                        from: '_PROTOCOL_',
                        to: grunt.template.process('<%= environments.' + grunt.config.get('env') + '.protocol %>')
                    }
                ],
                overwrite: true
            }
        }
    );

    grunt.loadNpmTasks('grunt-text-replace');
};
