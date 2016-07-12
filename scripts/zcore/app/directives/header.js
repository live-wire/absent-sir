(function(){
angular.module("absentApp").directive('header', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: '/views/directives/header.html',
    controller:'HeaderCtrl'
  };
});

angular.module("absentApp").directive('allstudents', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: '/views/directives/allstudents.html',
    controller:'AllStudentsCtrl'
  };
});

angular.module("absentApp").directive('attendanceSheet', function() {
  return {
    restrict: 'A',
    transclude: true,
    templateUrl: '/views/directives/attendance-sheet.html',
    controller:'AttendanceSheetCtrl'
  };
});



})();