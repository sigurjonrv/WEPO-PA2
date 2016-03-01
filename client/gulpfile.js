var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('minify', function () {
	gulp.src(['bower_components/angular/angular.min.js',
			  'bower_components/jquery/dist/jquery.js',
			  'bower_components/angular-animate/angular-animate.min.js',
			  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
			  'bower_components/angular-route/angular-route.min.js',
			  'bower_components/bootstrap/js/modal.js',
			  'src/app.js',
			  'node_modules/socket.io-client/dist/socket.io.min.js',
			  'services/socket.js',
			  'src/login/LoginController.js',
			  'src/resource/ChatResource.js',
			  'src/room/RoomController.js',
			  'src/roomlist/RoomlistController.js',
			  'src/message/MessageController.js',
			  'bower_components/lodash/dist/lodash.js'
			  ])
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('src/build'));
});