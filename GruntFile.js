module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate:{
            options:{
                singleQuotes: true
            },
            app1:{
                files: [{
                    expand: true,
                    src: ['dist/app.js'],
                    ext: '.annotated.js', //Dest filepaths will have this extension.
                    extDot: 'last',     //Ext in filenames begin after the last dot
                    //dest: 'app-script/annotate'
                }]
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            build: {
                src: 'dist/app.annotated.js',
                dest: 'build/app.min.js'
            }
        },
        concat: {
            dist2: {
                options: {
                    separator: '\n ;'
                },
                src: ["system/js/jquery.min.js", "system/js/modernizr.custom.min.js", "system/js/angular.min.js", "system/js/angular-route.js", "system/js/angular-animate.min.js", "system/js/jquery-ui.min.js", "system/js/bootstrap.min.js", "system/js/ng-infinite-scroll.min.js", "system/js/jquery.scrollTo.js", "system/js/messages.js", "system/js/pushy.min.js", "system/js/Crypto.js"],
                dest: 'build/all.files.js'
            },
        	dist: {
        		options: {
	        		separator: '\n ;'
	        	},
        		src: ['system/js/custom.js', 'app/*.js', 'app/**/*.js', 'login/*.js', 'people/*.js', 'people/**/*.js', 'filters/*.js','contact/*.js', 'system/js/ionic-ion-autoListDivider.js'],
        		dest: 'dist/app.js'
        	},
        	css: {
        		options: {
	        		separator: '\n\n'
	        	},
        		src: ['system/css/bootstrap/bootstrap.min.css', 'system/css/font-awesome.min.css', 'system/css/pushy.css', 'system/css/custom.min.css'],
        		dest: 'system/cssbuild/appcompiled.css'
        	}
        },
        cssmin: {
        	target: {
        		files:[{
        			expand: true,
        			cwd: 'system/css',
        			src: ['*.css', '!*.min.css'],
        			dest: 'system/css',
        			ext: '.min.css'
        		}]
        	}
        },
        watch:{
	    	files: ['GruntFile.js', 'dist/*.js', 'system/css/*.css'],
	    	tasks: ['ngAnnotate', 'concat', 'uglify', 'cssmin'],
	    	options:{
	    		atBegin: true	
	    	}
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-ng-annotate');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};
