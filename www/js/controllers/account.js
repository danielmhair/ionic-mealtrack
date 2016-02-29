var app = angular.module('mealtrack.controllers.account', []);

/*********************************************************************
 * AccountCtrl
 *********************************************************************/
app.controller('AccountCtrl', function ($scope, $state, AuthService) {

  $scope.$on('$ionicView.enter', function() {
    $scope.user = AuthService.getUser();
    if (!$scope.user) {
      $state.go("login");
    }

    $scope.formData = {
      name: $scope.user.name,
      email: $scope.user.email
    };

  });

	$scope.submit = function (form) {
    if (form.$valid) {
      console.log("AccountCtrl::submit");
      AuthService.update($scope.formData)
        .then(function(data) {
          $state.go("tab.meals");
        }, function(err) {
          $ionicPopup.alert({
            title: 'Save Error',
            subTitle: err
          });
        })
    }
	};

	$scope.logout = function () {
		console.log("AccountCtrl::logout");
		AuthService.logout();
    $scope.formData.name = "";
    $scope.formData.email = "";
    $state.go("login");
	};
});
