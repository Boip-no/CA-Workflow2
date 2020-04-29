module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON ("package.json"),
        sass: {
            dist: {
                files: {
                    "dist/css/style.css" : "sass/style.scss"
                }
            }
        },
        cssmin: {
            minify: {
                src: "dist/css/style.css",
                dest: "dist/css/minified/style.min.css"
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        "dist/css/minified/style.min.css"
                    ]
                },
                options: {
                    watchTask: true,
                    server: "./"
                }
            }
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{removeViewBox: false}]
                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images'
                }]
            }
        },
        watch: {
            css: {
                files: "sass/style.scss",
                tasks: ["sass", "cssmin", "imagemin"]
            },
            html: {
                files: "**/*.html",
            },
            img: {
                files: "dist/images",
                tasks: ["imagemin"]
            }

        }    
    });
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask("default", ["watch"]);
}