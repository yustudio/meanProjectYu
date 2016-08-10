(function() {

	angular.module('MeanAppYu', ['ui.router']);

	function config($stateProvider, $urlRouterProvider){
	
	$stateProvider
		.state('app',{
			url  : '/',
			views:{
				'header@' : {
					templateUrl : 'common/header/header.view.html',
					controller  : "HeaderController"
				},
				'content@':{
					templateUrl : "home/home.view.html",
					controller  : "HomeController"
				},
				'footer' :{
					templateUrl : "common/footer/footer.view.html",
					controller  : "FooterController"
				}
			}
		})

		.state('app.product1',{
			url  : 'product1',
			views:{
				'header@' : {
					templateUrl : 'common/header/header.view.html',
					controller  : "HeaderController"
				},
				'content@':{
					templateUrl : "products/product1.html",
					controller  : "HomeController"
				}				
			}
		})

		.state('app.product1.model1',{
			url  : 'model1',
			views:{
				'header@' : {
					templateUrl : 'common/header/header.view.html',
					controller  : "HeaderController"
				},
				'content@':{
					templateUrl : "products/product1model1.html",
					controller  : "HomeController"
				}				
			}
		})

		
		.state('app.aboutus',{
			url  : 'aboutus',
			views:{
				'header@' : {
					templateUrl : 'common/header/header.view.html',
					controller  : "HeaderController"
				},
				'content@':{
					templateUrl : "aboutus/aboutus.view.html",
					controller  : "AboutUsController"
				}
			}
		})
		.state('app.login',{
			url  : 'login',
			views:{
				'header@' : {
					templateUrl : 'common/header/header.view.html',
					controller  : "HeaderController"
				},
				'content@':{
					templateUrl : "auth/login/login.view.html",
					controller  : "LoginController"
				}
			}
		})

		.state('app.register',{
			url  : 'register',
			views:{
				'header@' : {
					templateUrl : 'common/header/header.view.html',
					controller  : "HeaderController"
				},
				'content@':{
					templateUrl : "auth/register/register.view.html",
					controller  : "RegisterController"
				}
			}
		})
		.state('app.profile',{
			url  : 'profile',
			views:{
				'header@' : {
					templateUrl : 'common/header/header.view.html',
					controller  : "HeaderController"
				},
				'content@':{
					templateUrl : "profile/profile.view.html",
					controller  : "ProfileController"
				}
			}
		});

	$urlRouterProvider.otherwise('/');
	};

	angular
    .module('MeanAppYu')
    .config(['$stateProvider', '$urlRouterProvider', config]);
    //.run(['$rootScope', '$location', 'authentication', run]);

})();