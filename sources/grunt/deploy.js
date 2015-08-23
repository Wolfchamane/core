module.exports = function(grunt){

    if (grunt.config.get('env') === 'local')
    {
        grunt.config.set('env', 'live');
    }

    grunt.registerTask(
        'deploy',
        [
            'backend',
            'core'
        ]
    );
};
