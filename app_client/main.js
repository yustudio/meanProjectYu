(function() {

	angular.module('MeanAppYu', ['ui.router']);

	function config($stateProvider, $urlRouterProvider){
	
	$stateProvider
		.state('app',{
			url  : '/',
			views:{
				'header' : {
					templateUrl : 'common/header/header.view.html',
					controller  : "HeaderController"
				},
				'content':{
					templateUrl : "home/home.view.html",
					controller  : "HomeController"
				},
				'footer' :{
					templateUrl : "common/footer/footer.view.html",
					controller  : "FooterController"
				}
			}
		})
		
		.state('app.aboutus',{
			url  : 'aboutus',
			views:{
				'content@':{
					templateUrl : "aboutus/aboutus.view.html",
					controller  : "AboutUsController"
				}
			}
		})
		.state('app.login',{
			url  : 'login',
			views:{
				'content@':{
					templateUrl : "auth/login/login.view.html",
					controller  : "LoginController"
				}
			}
		})

		.state('app.signup',{
			url  : 'signup',
			views:{
				'content@':{
					templateUrl : "auth/register/register.view.html",
					controller  : "RegisterController"
				}
			}
		})
		.state('app.profile',{
			url  : 'profile',
			views:{
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