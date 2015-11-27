module.exports = function(grunt){

    grunt.config(
        'replace',
        {
            core:{
                src: '<%= directories.dest.base %>core.js',
                overwrite: true,
                replacements: [
                    {
                        from: '_HOST_',
                        to: grunt.template.process('<%= environments.' + grunt.config.get('env') + '.host %>')
                    },
                    {
                        from: '_PROTOCOL_',
                        to: grunt.template.process('<%= environments.' + grunt.config.get('env') + '.protocol %>')
                    },
                    {
                        from: '_ALLOWED_URLS_',
                        to: grunt.template.process('<%= environments.' + grunt.config.get('env') + '.allowedUrl %>')
                    }
                ]
            },
            demo: {
                src: '<%= directories.dest.base %>index.html',
                overwrite: true,
                replacements: [
                    {
                        from: '__VENDORS__',
                        to: './vendors/'
                    }
                ]
            },
            components: {
                src: '<%= directories.dest.base %>components/*.html',
                overwrite: true,
                replacements: [
                    {
                        from: '__VENDORSDEST__',
                        to: '../vendors/'
                    }
                ]
            }
        }
    );

    grunt.loadNpmTasks('grunt-text-replace');
};
