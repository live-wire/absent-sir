(function(){
angular.module("absentApp").controller("StudentCtrl",['$scope','$rootScope',function($scope,$rootScope){

	//Don't touch this
	if($rootScope.isLoggedIn() && $rootScope.userGlobal.access!='student')
	{
		$rootScope.$emit("CallParentRefreshMethod", {});
	}
	else if(!$rootScope.isLoggedIn())
	{
		$rootScope.$emit("CallParentLoginMethod",{});
	}





}]);

})();