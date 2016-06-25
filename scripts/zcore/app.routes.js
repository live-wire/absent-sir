(function(){

angular.module("absentApp").config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/student', {
        templateUrl: 'views/studentview.html',
        controller: 'StudentCtrl'
      }).
      when('/teacher', {
        templateUrl: 'views/teacherview.html',
        controller: 'TeacherCtrl'
      }).
      when('/admin', {
        templateUrl: 'templates/adminview.html',
        controller: 'AdminCtrl'
      }).
      otherwise({
        redirectTo: '/student'
      });
  }]);

})();