(function (){
	angular.module('MeanAppYu')		
		.controller('RegisterController', ['$scope', '$location', 'authentication', function($scope,$location,authentication){
			console.log('Running RegisterController');

			var user={
				firstName:"",
				lastName: "",
				email:"",
				password:""
			};

			$scope.dataloading = false;
			$scope.user = user;

			$scope.register=function(){
				console.log(JSON.stringify(user));
				$scope.dataloading = true;
				authentication.register(user)
				.success(function(data){
						console.log("Registration Successful");
						$location.path('/profile');
					})
				.error(function(err){
						console.log("Registraion failed: "+ err.message);
						alert("Registraion failed: "+ err.message);
						$location.path("/register");
						$scope.dataloading = false;
				});		
			};

		}]);

})();

	