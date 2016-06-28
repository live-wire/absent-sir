(function(){
angular.module("absentApp").controller("AdminCtrl",['$scope','$rootScope',function($scope,$rootScope){

	//Don't touch this
	if($rootScope.isLoggedIn() && $rootScope.userGlobal.access!='admin')
	{
		$rootScope.$emit("CallParentRefreshMethod", {});
	}
	else if(!$rootScope.isLoggedIn())
	{
		$rootScope.$emit("CallParentLoginMethod",{});
	}





}]);

})();