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

angular.module("absentApp").directive('fileModel', ['$parse', function ($parse) {
  return {
     restrict: 'A',
     controller:'AdminCtrl',
     link: function(scope, element, attrs) {
       //            console.log(attrs);

        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        console.log("element here");
        console.log(element);
        element.bind('change', function(){
          // console.log(element[0].files[0]);

           scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
              console.log(scope);
           });
           scope.parseSelectedFile();
        });
     }
  };
}]);



})();