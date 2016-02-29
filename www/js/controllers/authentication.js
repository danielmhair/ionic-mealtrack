var app = angular.module('mealtrack.controllers.authentication', []);

/*********************************************************************
 * LoginCtrl
 *********************************************************************/
app.controller('LoginCtrl', function ($scope, $state, AuthService) {

  $scope.$on('$ionicView.enter', function() {
    $scope.formData = {
      "email": "",
      "password": ""
    };
  });

  $scope.login = function (form) {
		console.log("LoginCtrl::login");
		if (form.$valid) {
      AuthService.login($scope.formData.email, $scope.formData.password);
    }
	};

  $scope.googleConnect = function() {
    AuthService.googleLogin()
      .then(function(data) {
        console.log("found google");
        console.log(data);
        $state.go("tab.account");
      }, function(err) {
        console.log(err);
      });
  };

  $scope.facebookConnect = function() {
    AuthService.facebookLogin()
      .then(function(data) {
        console.log("found facebook");
        console.log(data);
        $state.go("tab.account");
      }, function(err) {
        console.log(err);
      });
  };

});

/*********************************************************************
 * SignupCtrl
 *********************************************************************/
app.controller('SignupCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		"name": "",
		"email": "",
		"password": ""
	};

	$scope.signup = function (form) {
		console.log("SignupCtrl::signup");
    if (form.$valid) {
      AuthService.signup($scope.formData.email, $scope.formData.name, $scope.formData.password);

    } else {
      console.log("Invalid Form");
    }
	};

});
