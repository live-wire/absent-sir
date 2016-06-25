(function(){
angular.module("absentApp").directive('header', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: '/views/directives/header.html',
    controller:'HeaderCtrl'
  };
});




})();