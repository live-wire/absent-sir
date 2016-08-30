(function(){

angular.module("absentApp").config(['$routeProvider', function($routeProvider) {
    var params=window.location.search;
    $routeProvider.
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      }).
      when('/student', {
        templateUrl: 'views/studentview.html',
        controller: 'StudentCtrl'
      }).
      when('/teacher', {
        templateUrl: 'views/teacherview.html',
        controller: 'TeacherCtrl'
      }).
      when('/admin', {
        templateUrl: 'views/adminview.html',
        controller: 'AdminCtrl'
      }).
      otherwise({
        redirectTo: '/login'+params
      });
  }]);

})();