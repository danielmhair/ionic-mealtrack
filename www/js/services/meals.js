var app = angular.module('mealtrack.services.meals', []);

app.service("MealService", function ($q, AuthService) {
	var self = {
		'page': 0,
		'page_size': 20,
		'isLoading': false,
		'isSaving': false,
		'hasMore': false,
		'results': [],
		'refresh': function () {
			self.page = 0;
			self.isLoading = false;
			self.isSaving = false;
			self.hasMore = true;
			//self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var d = $q.defer();
      if (self.results.length > (self.page * self.page_size)) {
        self.hasMore = true;
      }
      var results = self.results.splice(0, self.page_size);
      self.isLoading = false;
      d.resolve(results);

			return d.promise;
		},
		'track': function (data) {
			self.isSaving = true;
			var d = $q.defer();

      var user = AuthService.user;
      var file = data.picture ? new Parse.File("photo.jpg", {base64: data.picture}): null;
      var meal = {
        owner: user,
        picture: file,
        title: data.title,
        category: data.category,
        calories: parseInt(data.calories),
        created: new Date()
      };
      console.log("Meal Tracked");
      self.results.unshift(meal);
      d.resolve(meal);

      //$ionicPopup.alert({
      //  title: "Error saving meal",
      //  subTitle: error.message
      //});
      //
      //d.reject(error);

      return d.promise;
		}

	};

	return self;
});
