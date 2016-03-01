"use strict";
/*global
	chatApp
*/
/*global
	document
	*/

chatApp.controller("RoomlistController", ["$scope", "socket", "$location", "$routeParams",
function ($scope, socket, $location, $routeParams) {
	socket.emit("users");
	socket.emit("rooms");
	$scope.user = $routeParams.user;

	$scope.joinRoom = function(roomname) {
		var Room = {room : roomname};
		$scope.roomname = Room;
		socket.emit("joinroom", Room, function(success, err) {
			if(success) {
				$location.path("/" + $scope.user + "/"+ "rooms/" + roomname + "/");
			}
		});
	};

	$scope.logOut =function() {
		socket.emit("disc"); // <- changed this command in the server!
		$location.path("/login");
	};

	$scope.createRoom = function(newRoomName) {
		if(!newRoomName) {
			var div = document.getElementById("err");
			div.style.visibility = 'visible';
		} else {
			var newRoom = {
				room : newRoomName
			};
			socket.emit("joinroom", newRoom, 
			function(success,err) {
				if(success) {
					$location.path("/" + $scope.user + "/"+ "rooms/" + newRoomName + "/");
				}
			});
		}
	};

	/*get list of Rooms from server*/
	socket.on("roomlist", 
	function(roomlist) {
		$scope.roomlist = _.keys(roomlist);
	});
}]);