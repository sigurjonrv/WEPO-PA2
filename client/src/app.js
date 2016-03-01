"use strict";
var chatApp = angular.module("chatApp", ["ngRoute"]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "src/login/login.html",
		controller: "LoginController"
	}).when("/:user/rooms", {
		templateUrl: "src/roomlist/roomlist.html",
		controller: "RoomlistController"
	}).when("/:user/rooms/:room", {
		templateUrl: "src/room/room.html",
		controller: "RoomController"
	}).otherwise({redirctTo: "/login"});
	// skilgreina allar routes
}]);