angular.module('mealtrack.directives.spacer', [])
  .directive('ionSpacer', function () {
    return {
      templateUrl: 'js/directives/ion-spacer.html',
      restrict: 'EA',
      replace: true,
      scope: {
        padding: '@'
      },
      link: function (scope, element, attrs) {
      },
      transclude: true
    };
  });
