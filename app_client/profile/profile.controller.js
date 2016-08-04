(function () {

	angular.module('MeanAppYu')
			.controller('ProfileController', ['$scope', 'meanData', function($scope, meanData){
				console.log('Running ProfileController');

				meanData.getProfile()
					.success(function(data) {
					$scope.user = data;
				})
				.error(function (err) {
					console.log(err);
				});

			}]);

})();

