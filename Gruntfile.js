module.exports = function(grunt) {
    // config
    grunt.initConfig({
        uncss : {
            dist : {
                files : {
                    './scss/style.scss' : ['index.html']
                }
            }
        }
    });

    // plugin
    grunt.loadNpmTasks('grunt-uncss');

    // taskgrunt default
    grunt.registerTask('default', 'uncss');
}