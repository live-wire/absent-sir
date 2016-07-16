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


//Registered Classes	
//Need to get Values from from FireBase 	
$scope.divTitle = "My Classes";

$scope.classes = [{courseTitle : "Data Structures" , courseId : "CSE 503" , timings : ["Wed 1-3","Fri 1-3"]},{courseTitle : "Data Structures" , courseId : "CSE 503" , timings : ["Wed 1-3","Fri 1-3"]},{courseTitle : "Data Structures" , courseId : "CSE 503" , timings : ["Wed 1-3","Fri 1-3"]}];
//


}]);

})();