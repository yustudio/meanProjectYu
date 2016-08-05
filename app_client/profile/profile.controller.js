(function () {

	angular.module('MeanAppYu')
			.controller('ProfileController', ['$scope', 'meanData', function($scope, meanData){
				console.log('Running ProfileController');

				meanData.getProfile()
					.success(function(data) {
					$scope.user = data;
					console.log(data);
				})
				.error(function (err) {
					console.log(err);
				});

			}]);

})();

