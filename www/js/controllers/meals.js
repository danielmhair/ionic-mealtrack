var app = angular.module('mealtrack.controllers.meals', []);


/*********************************************************************
 * MealListCtrl
 *********************************************************************/
app.controller('MealListCtrl', function ($scope, $state, $ionicLoading, MealService, AuthService) {

	$scope.meals = MealService;

  $scope.$on('$ionicView.enter', function() {
    $scope.user = AuthService.getUser();
    if (!$scope.user) {
      $state.go("login");
    }
  });


  $scope.refreshItems = function () {
		$scope.meals.refresh().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.nextPage = function () {
		$scope.meals.next().then(function () {
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

});

/*********************************************************************
 * MealCreateCtrl
 *********************************************************************/
app.controller('MealCreateCtrl', function ($scope, $state, $ionicPopup, $ionicLoading,
                                           $cordovaCamera, MealService, AuthService) {

  $scope.$on('$ionicView.enter', function() {
    $scope.resetFormData();

    $scope.user = AuthService.getUser();
    if (!$scope.user) {
      $state.go("login");
    }
  });

  $scope.resetFormData = function () {
		$scope.formData = {
			'title': '',
			'category': '',
			'calories': 29,
			'picture': null
		};
	};

	$scope.trackMeal = function (form) {
		if (form.$valid) {
      console.log("MealCreateCtrl::trackMeal");
      $ionicLoading.show();
      MealService.track($scope.formData).then(function() {
        $scope.resetFormData();
        $ionicLoading.hide();
        form.$setPristine(true);
        $state.go("tab.meals");
      });
    }
	};

	$scope.addPicture = function () {
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY, // In production, do .CAMERA
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 480,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.formData.picture = imageData;
    }, function(err) {
      $ionicPopup.alert({
        title: 'Error getting picture',
        subTitle: 'We had a problem trying to get that picture. Please try again.'
      });
    });


	};

});
