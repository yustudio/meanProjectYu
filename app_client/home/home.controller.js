(function () {

	angular.module('MeanAppYu')		
			.controller('HomeController', ['$scope', function($scope){
				console.log('Running HomeController');

				$scope.models = [{name: "model1", spec1: "spec1", spec2: "spec2"},{name: "model2", spec1: "spec1", spec2: "spec2"}];


			}]);

})();

