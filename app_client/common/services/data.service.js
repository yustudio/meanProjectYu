(function() {

  angular
    .module('MeanAppYu')
    .service('meanData', ['$http', 'authentication', function($http, authentication) {

	    // pass token to API /api/profile, server expects JWT in the header 
	    // on the request called Authorization
	    var getProfile = function () {
	      return $http.get('/api/profile', {
	        // Bearer is http token based strategy
	        headers: {
	          Authorization: 'Bearer '+ authentication.getToken()
	        }
	      });
	    };

	    return {
	      getProfile : getProfile
	  	};
    }]);
})();