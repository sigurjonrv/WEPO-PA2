"use strict";
/*global
	chatApp
*/
/*global
	document
*/
/*global
	window
*/
chatApp.controller("RoomController",["$scope","$location", "$routeParams","socket",
function RoomController($scope, $location, $routeParams, socket) {
	$scope.roomName = $routeParams.room;
	$scope.user = $routeParams.user;
	socket.emit("users");

	$scope.sendPrivateMessage = function(recever, msg) {
		var div = document.getElementById("PMerr");
		div.style.visibility = 'hide';

		var prvmsg = {
			nick: $scope.P_recever,
			message: msg
		};
		if(recever != $scope.user) {
			socket.emit("privatemsg", prvmsg, function(success) {
				if(!success) {
					alert("somthing vent wrong!");
				} else {
					$("#pm").modal('hide');
				}
			});
		} else {
			div.style.visibility = 'visible';
		}
	};

	$scope.PMrecever = function(recever) {
		$scope.P_recever = recever;
	};

	$scope.changeUserName = function() {
		$location.path("/login");
		socket.emit("partroom", $scope.roomName);
	};

	$scope.leaveRoom = function() {
		socket.emit("partroom", $scope.roomName);
		$location.path( "/" + $scope.user + "/rooms");
	};

	$scope.sendMessage = function() {
		var message = {
			roomName: $scope.roomName,
			msg: $scope.message
		};
		socket.emit("sendmsg", message);
		$scope.message = "";
	};

	$scope.banUser = function(userToBeBaned) { 
		var ban = {
			user: userToBeBaned,
			room: $scope.roomName
		};
		socket.emit("ban", ban, function(success) {
			if(success) {
				alert("user has ben Banned from this room");
			} else {
				if(ban.userToBeBaned === $scope.user) {
					alert("you silly.. you cant ban your self!");
				} else {
					alert("somthing went wrong! are you sure you have the right to do this?");
				}
			}
		});
	};

	$scope.kickUser = function(userToBeKicked) {
		var kick = {
			user: userToBeKicked,
			room: $scope.roomName
		};
		socket.emit("kick", kick, function(success) {
			if(success) {
				alert("user has ben kicket from this room");
			} else {
				if(kick.userToBeKicked === $scope.user) {
					alert("you silly.. you cant kick your self!");
				} else {
					alert("somthing went wrong! are you sure you have the right to do this?");
				}
			}
		});
	};

	$scope.closePM = function() {
		$('#PMModal').modal('hide');
		$('#pm').modal();
	};

	$scope.replayPM = function(recever, msg) {
		var prvmsg = {
			nick: recever,
			message: msg
		};
		if($scope.recever != $scope.user) {
			socket.emit("privatemsg", prvmsg, function(success) {
				if(!success) {
					alert("somthing vent wrong!");
				}
			});
		}
		$('#PMModal').modal('hide');
		$scope.PMmessage = "";
	};

	socket.on("updatechat", function(room, message) {
		if(room == $scope.roomName) {
			$scope.messageArr = message;
		}
	});

	socket.on("kicked", function( room, toBeKicked) {
		if(room === room && toBeKicked === $scope.user) {
			var prevRoomName = $scope.roomName;
			socket.emit("partroom", $scope.roomName);
			$location.path("/" + $scope.user + "/rooms");
			alert("You have ben kick from the room: " + prevRoomName);
		}
	});

	socket.on("banned", function( room, toBeBaned) {
		if(room === room && toBeBaned === $scope.user) {
			var prevRoomName = $scope.roomName;
			socket.emit("partroom", $scope.roomName);
			$location.path("/" + $scope.user + "/rooms");
			alert("You have ben Banned from the room: " + prevRoomName);
		}
	});

	/*get list of users from server*/
	socket.on("updateusers", function(room, user, admins) {
		if(room == $scope.roomName) {
			$scope.userlist = _.keys(user);
			$scope.adminlist = _.keys(admins);
		}
	});

	socket.on("recv_privatemsg",function(sender, message) {
		$scope.PMSender = sender;
		$scope.PM = message;
		$("#pm").modal('hide');
		$("#PMModal").modal();
	});
	
	$scope.PMmessage = "";
}]);