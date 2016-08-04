( function() {
angular.module('MeanAppYu')		
		.service('authentication', ['$http', '$window', '$location', function($http, $window, $location){
			console.log('Running authentication');

			var saveToken = function (token) {
				$window.localStorage['mean-token'] = token;
			};

			var getToken = function () {
				return $window.localStorage['mean-token'];
			};

			var isLoggedIn = function() {
				var token = getToken();
				var payload;

				if(token){
					payload = token.split('.')[1]; // get second part of token
					payload = $window.atob(payload);  // decode a base64 string
					payload = JSON.parse(payload); // parse it as JSON

					return payload.exp > Date.now() / 1000;
				} else {
					return false;
				}
			};

			var currentUser = function() {
				if(isLoggedIn()){
					var token = getToken();
					var payload = token.split('.')[1];
					payload = $window.atob(payload);
					payload = JSON.parse(payload);
				return {
					email : payload.email,
					name : payload.name
				};
				}
			};

			register = function(user) {
				console.log("-------------Inside auth.service")
				return $http.post('/api/register', user).success(function(data){
				saveToken(data.token);
				});
			};

			login = function(user) {
				return $http.post('/api/login', user).success(function(data) {
				saveToken(data.token);
				});
			};

			logout = function() {
				$window.localStorage.removeItem('mean-token');			
			}; 

			return {
				currentUser : currentUser,
				saveToken : saveToken,
				getToken : getToken,
				isLoggedIn : isLoggedIn,
				register : register,
				login : login,
				logout : logout
			};

	

		}]);

})();