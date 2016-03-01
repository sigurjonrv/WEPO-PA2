"use strict";

angular.module("chatApp").factory("ChatResource",
function ChatResource() {
	return {
		login: function login(user, pass, callback) {
				console.log("login!");
		},
		getRoomList: function getRoomList(callback) {
				console.log("get roomlist!");
		},
	};
});