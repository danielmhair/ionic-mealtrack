var app = angular.module('mealtrack', [
	'ionic',
  'ionic.service.core',
  'ionic.service.analytics',
  'ionic.service.deploy',
  'firebase',
	'ngMessages',
	'ngCordova',
  'ngCordovaOauth',
	'angularMoment',
	'mealtrack.controllers.authentication',
	'mealtrack.controllers.meals',
	'mealtrack.controllers.account',
	'mealtrack.services.authentication',
  'mealtrack.services.googleService',
	'mealtrack.services.meals',
  'mealtrack.services.facebookService',
	'mealtrack.filters.mealtime',
  'mealtrack.directives.spacer',
  'mealtrack.utils'
]);

app.constant("FIREBASE_URL", 'https://usuite.firebaseio.com');
app.constant("FACEBOOK_APP_ID", '470257669848563');
app.constant("GOOGLE_CLIENT_ID", '3567147298-h3egd5uclcgrn18noun537qvvbd4lj7d.apps.googleusercontent.com');
app.constant("GOOGLE_API_KEY", 'AIzaSyCe4MddD-mLTAPmtbELBVjXMhwebdz57ik');
app.constant("TWITTER_APP_ID", '36LwYpi132fVTnyVnTCIEWMg1');
app.constant("APP_GOOGLE_SCOPE", [
  "https://www.googleapis.com/auth/urlshortener",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/calendar"
]);


app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleBlackTranslucent();
		}
	});
});

app.config(function ($stateProvider, $urlRouterProvider, FACEBOOK_APP_ID) {
  openFB.init({appId: FACEBOOK_APP_ID});
});

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login', {
			url: "/login",
			cache: false,
			controller: 'LoginCtrl',
			templateUrl: "templates/login.html"
		})
    .state('loginFacebook', {
      url: "/login/facebook",
      cache: false,
      controller: 'LoginCtrl',
      templateUrl: "templates/facebookLogin.html"
    })
    .state('loginGoogle', {
      url: "/login/google",
      cache: false,
      controller: 'LoginCtrl',
      templateUrl: "templates/googleLogin.html"
    })
		.state('signup', {
			url: "/signup",
			cache: false,
			controller: 'SignupCtrl',
			templateUrl: "templates/signup.html"
		})
		.state('tab', {
			url: "/tab",
			abstract: true,
			templateUrl: "templates/tabs.html"
		})
    .state('tab.meals', {
      url: "/meals",
      views: {
        'tab-meals': {
          templateUrl: "templates/tabs/tab-meals.html",
          controller: 'MealListCtrl'
        }
      }
    })
    .state('tab.account', {
      url: "/account",
      views: {
        'tab-account': {
          templateUrl: "templates/tabs/tab-account.html",
          controller: 'AccountCtrl'
        }
      }

    })
    .state('tab.track', {
      url: "/track",
      views: {
        'tab-track': {
          templateUrl: "templates/tabs/tab-track.html",
          controller: 'MealCreateCtrl'
        }
      }
    });

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});
