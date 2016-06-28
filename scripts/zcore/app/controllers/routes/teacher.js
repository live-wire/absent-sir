(function(){
angular.module("absentApp").controller("TeacherCtrl",['$scope','$rootScope',function($scope,$rootScope){

	//Don't touch this
	if($rootScope.isLoggedIn() && $rootScope.userGlobal.access!='teacher')
	{
		$rootScope.$emit("CallParentRefreshMethod", {});
	}
	else if(!$rootScope.isLoggedIn())
	{
		$rootScope.$emit("CallParentLoginMethod",{});
	}



}]);

})();