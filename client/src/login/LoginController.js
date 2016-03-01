"use strict";
/*global
	chatApp
*/
/*global
	document
	*/

chatApp.controller("LoginController",["$scope","$location","socket",
function ($scope, $location, socket) {
	//lets user log in to the server with a given username
	$scope.onLogin = function() {
		socket.emit("adduser", $scope.user, function(available) {
			if(available){
				if($scope.user === "") {
					var div = document.getElementById("err2");
					div.style.visibility = 'visible';
				} else {
					$location.path($scope.user + "/rooms/");
				}
			} else {
				var div2 = document.getElementById("err");
				div2.style.visibility = 'visible';
			}
		});
	};
}]);