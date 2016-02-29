var app = angular.module('mealtrack.services.googleService', []);

app.factory('GoogleService', function ($http, $rootScope, $q, GOOGLE_CLIENT_ID, APP_GOOGLE_SCOPE, GOOGLE_API_KEY) {
  var domain = 'localhost:8100';

  var self = {
    curUser: {},
    update: function(user) {
      self.curUser.name = user.name;
      self.curUser.email = user.email;
    },
    login: function () {
      console.log("logging in");
      var deferred = $q.defer();
      gapi.auth.authorize({
        client_id: GOOGLE_CLIENT_ID,
        scope: APP_GOOGLE_SCOPE,
        immediate: false,
        hd: domain
      }, function(authResult) {
        console.log("handling auth result");
        if (authResult && !authResult.error) {
          gapi.client.load('oauth2', 'v2', function () {
            var request = gapi.client.oauth2.userinfo.get();
            request.execute(function(resp) {
              console.log("handled auth result");
              self.curUser = resp;
              console.log(self.curUser);
              self.curUser.type = "google";
              deferred.resolve(self.curUser);
            });
          });
        } else {
          console.log("Not authorized");
          deferred.reject('Not authorized');
        }
      });

      return deferred.promise;
    },
    logout: function () {
      self.curUser = {};
    },
    loadClient: function () {
      console.log("Loading client");
      gapi.client.setApiKey(GOOGLE_API_KEY);
      gapi.auth.init(function () { });
      window.setTimeout(self.checkAuth, 1);
      console.log("Loaded client");
    },
    checkAuth: function() {
      var deferred = $q.defer();
      console.log("Checking auth");
      gapi.auth.authorize({
        client_id: GOOGLE_CLIENT_ID,
        scope: APP_GOOGLE_SCOPE,
        immediate: true,
        hd: domain
      }, function(authResult) {
        console.log("handling auth result");
        if (authResult && !authResult.error) {
          gapi.client.load('oauth2', 'v2', function () {
            var request = gapi.client.oauth2.userinfo.get();
            request.execute(function(resp) {
              console.log("handled auth result");
              self.curUser = resp;
              console.log(resp);
              deferred.resolve(resp);
            });
          });
        } else {
          console.log("error");
          deferred.reject('error');
        }
      });

      console.log("Checked auth");
      return deferred.promise;
    },
    authorize: function(event) {
      gapi.auth.authorize({
        client_id: GOOGLE_CLIENT_ID,
        scope: APP_GOOGLE_SCOPE,
        immediate: false,
        hd: domain
      }, function(authResult) {
        console.log("authorized?");
        return authResult && !authResult.error;
      });

      return false;
    }
  };

  return self;
});
