// UI view ref:
// https://github.com/angular-ui/ui-router/wiki/Nested-States-%26-Nested-Views
// http://plnkr.co/edit/gmtcE2?p=preview

// http://stackoverflow.com/questions/19776345/multiple-nested-ui-views-with-ui-router-and-angularjs

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
				'content@app':{
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
				'content@app.product1':{
					templateUrl : "products/product1model1.html",
					controller  : "HomeController"
				}				
			}
		})

		.state('app.product2',{
			url  : 'product2',
			views:{
				'header@' : {
					templateUrl : 'common/header/header.view.html',
					controller  : "HeaderController"
				},
				'content@app':{
					templateUrl : "products/product2.html",
					controller  : "HomeController"
				}				
			}
		})

		.state('app.product2.model1',{
			url  : 'model1',
			views:{
				'header@' : {
					templateUrl : 'common/header/header.view.html',
					controller  : "HeaderController"
				},
				'content@app.product2':{
					templateUrl : "products/product2model1.html",
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