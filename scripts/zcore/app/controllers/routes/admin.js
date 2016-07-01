(function(){
angular.module("absentApp").controller("AdminCtrl",['$scope','$rootScope','$timeout','firebaseService',function($scope,$rootScope,$timeout,firebaseService){

	//Don't touch this
	if($rootScope.isLoggedIn() && $rootScope.userGlobal.access!='admin')
	{
		$rootScope.$emit("CallParentRefreshMethod", {});
	}
	else if(!$rootScope.isLoggedIn())
	{
		$rootScope.$emit("CallParentLoginMethod",{});
	}
	else
	{
		$scope.init();
	}
	$scope.init =function(){


	};





}]);

})();