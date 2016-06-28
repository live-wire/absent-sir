(function(){
angular.module("absentApp").controller("HeaderCtrl",['$scope','$rootScope',function($scope,$rootScope){

		$rootScope.$on("loggedIn", function(){
           $scope.init();
        });
		$scope.logOutClick = function(){
			$rootScope.logOut().then(function(message){
           	console.log(message);
           },function(err){console.log(err);});

		};
        $scope.init = function(){
			$scope.account = $rootScope.userGlobal.account;
			$scope.role = $rootScope.userGlobal.access;
		};

}]);

})();