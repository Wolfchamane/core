module.exports = function(grunt){
    grunt.config(
        'replace',
        {
            ddbb: {
                src: ['<%= directories.backend.dest %>_ddbb.php'],
                replacements: [
                    {
                        from: '_ENV_HOST_',
                        to: grunt.template.process('<%= environments.backend.' + grunt.config.get('env') + '.host %>')
                    },
                    {
                        from: '_ENV_USR_',
                        to: grunt.template.process('<%= environments.backend.' + grunt.config.get('env') + '.usr %>')
                    },
                    {
                        from: '_ENV_PWD_',
                        to: grunt.template.process('<%= environments.backend.' + grunt.config.get('env') + '.pwd %>')
                    },
                    {
                        from: '_ENV_ORG_',
                        to: grunt.template.process('<%= environments.backend.' + grunt.config.get('env') + '.org %>')
                    }
                ],
                overwrite: true
            },
            models: {
                src: [
                    '<%= directories.backend.dest %>getMovies.php',
                    '<%= directories.backend.dest %>getUser.php'
                ],
                replacements: [
                    {
                        from: '_ENV_ISLOCAL_',
                        to: (grunt.config.get('env') === 'local') ? '1' : '0'
                    }
                ],
                overwrite: true
            },
            core:{
                src: '<%= directories.core.dest %>',
                replacements: [
                    {
                        from: '_HOST_',
                        to: grunt.template.process('<%= environments.core.' + grunt.config.get('env') + '.host %>')
                    },
                    {
                        from: '_PROTOCOL_',
                        to: grunt.template.process('<%= environments.core.' + grunt.config.get('env') + '.protocol %>')
                    }
                ],
                overwrite: true
            }
        }
    );

    grunt.loadNpmTasks('grunt-text-replace');
};
