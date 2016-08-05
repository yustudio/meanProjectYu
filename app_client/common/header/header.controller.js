(function () {

	angular.module('MeanAppYu')		
			.controller('HeaderController', ['$scope', '$location', 'authentication', function($scope, $location, authentication){
				console.log('Running HeaderController');

			    $scope.isLoggedIn = authentication.isLoggedIn();

			    $scope.currentUser = authentication.currentUser();

			    $scope.isLoggedIn = authentication.isLoggedIn();

			    console.log("logged in: " + $scope.isLoggedIn);
			    
			    $scope.logout = function(){
			      authentication.logout();    
			      $location.path('/');
			    };

			    // $scope.signIn = function(){
			    //   //$location.path('/login');
			    //   onSubmit();
			    // }

			    $scope.profile = function(){
			      $location.path('/profile');
			    };

				user = {
					email : "",
					password : ""
				};

				$scope.user = user;

				$scope.login = function () {
					authentication
					.login(user)					
					.success(function(){
						$location.path('profile');
					})
					.error(function(err){
						alert(err.message);
					});
				};


			}]);

})();
