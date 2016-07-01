(function(){
angular.module("absentApp").controller("TeacherCtrl",['$scope','$rootScope','firebaseService',function($scope,$rootScope,firebaseService){

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