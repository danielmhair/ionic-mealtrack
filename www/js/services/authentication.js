var app = angular.module('mealtrack.services.authentication', []);

app.service('AuthService', function ($q, $http, $cordovaOauth, GoogleService, FacebookService, GOOGLE_CLIENT_ID, APP_GOOGLE_SCOPE) {

  var self = {
    curUser: {
      google: {},
      facebook: {}
    },
    getUser: function() {
      return self.curUser;
    },
    logout: function () {
      self.curUser = {
        google: {},
        facebook: {},
        loggedInWith: ""
      };
    },
    googleLogin: function () {
      var deferred = $q.defer();

      if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
        $cordovaOauth.google(GOOGLE_CLIENT_ID, APP_GOOGLE_SCOPE)
          .then(function (user) {
            console.log("Logged in for cordova");
            self.curUser.google = user;
            self.curUser.loggedInWith = "google";
            self.curUser.name = data.name;
            self.curUser.email = data.email;
            deferred.resolve(user);

          }, function (error) {
            console.log("error for cordova");
            console.log(error);
            deferred.reject(error);
          });
      } else {
        alert("isNotAndroid");
        GoogleService.login()
          .then(function (data) {
            console.log("Logged in for web");
            console.log(data);
            self.curUser.google = data;
            self.curUser.loggedInWith = "google";
            self.curUser.name = data.name;
            self.curUser.email = data.email;
            deferred.resolve(data);
          }, function (err) {
            console.log("error for web");
            console.error(err);
            deferred.reject(error);
          });
      }
      return deferred.promise;
    },
    facebookLogin: function() {
      var deferred = $q.defer();

      FacebookService.loginUser()
        .then(function(data) {
          console.log("Logged in");
          console.log(data);
          self.curUser.google = data;
          self.curUser.loggedInWith = "facebook";
          self.curUser.name = data.name;
          self.curUser.email = data.email;
          deferred.resolve(data);
        }, function(err) {
          console.error(err);
          deferred.reject(err);
        });

      return deferred.promise;
    },
    login: function (email, password) {
      var deferred = $q.defer();

      //USE -- https://github.com/nraboy/ng-cordova-oauth
      //USE for design -- http://doc.ionicmaterialdesign.com/

      if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {

      } else {

      }


      return deferred.promise;
    },
    signup: function (email, name, password) {
      var deferred = $q.defer();

      //TODO

      return deferred.promise;
    },
    update: function (data) {
      var deferred = $q.defer();

      self.curUser.name = data.name;
      self.curUser.email = data.email;

      GoogleService.update(data);

      deferred.resolve(data);

      return deferred.promise;
    }

  };

  return self;
});

