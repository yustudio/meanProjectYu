(function () {

	angular.module('MeanAppYu')		
			.controller('HeaderController', ['$scope', '$location', '$state', 'authentication', function($scope, $location, $state, authentication){
				console.log('Running HeaderController');

				user = {
					email : "",
					password : ""
				};

				$scope.user = user;

			    $scope.isLoggedIn = authentication.isLoggedIn();

			    $scope.currentUser = authentication.currentUser();

			    //$scope.isLoggedIn = authentication.isLoggedIn();

			    $scope.facebookSignin = function() {
			    	authentication.facebookLogin()
			    	.success(function(data){
			    		console.log("Header controller, Login Successful");
			    		$location.path('/profile');
			    	})
			    	.error(function(err){
			    		console.log("Header controller, Login failed: " + err);
			    		alert("Header controller, Login failed: " + err);
			    		$location.path("/login");
			    	});	
			    } 

			    console.log("logged in: " + $scope.isLoggedIn);
			    
			    $scope.logout = function(){
			      authentication.logout();
			      if ($state.is('app')) {
			      	$state.reload();
			      } else {
			      	$location.path('/');	
			      }			      
			    };

			    // $scope.signIn = function(){
			    //   //$location.path('/login');
			    //   onSubmit();
			    // }

			    $scope.profile = function(){
			      $location.path('/profile');
			    };

				$scope.login = function () {
					authentication
					.login(user)					
					.success(function(){
						$location.path('profile');
					})
					.error(function(err){
						alert(err.message);
						if (err.message === 'User not found. Please register.') {
							$location.path('/register');
						}
					});
				};


			}]);

})();
