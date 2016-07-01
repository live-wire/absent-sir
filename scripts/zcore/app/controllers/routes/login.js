(function(){
angular.module("absentApp").controller("LoginCtrl",['$scope','$rootScope','firebaseService','$q','$location','growl',function($scope,$rootScope,firebaseService,$q,$location,growl){

if($rootScope.isLoggedIn())
{
	$rootScope.$emit("CallParentRefreshMethod", {});
}
$scope.signIn=function(userVar)
{
	var encoded = btoa(userVar.email);
	$rootScope.fetchSingleUser(encoded).then(function(obj){
	console.log(obj);
	if(obj){
		firebaseService.signIn(userVar.email,userVar.password).then(function(){
						console.log("LoggedIn");
					},function(err){
						console.log(err);
						growl.error(err.message, {title: 'ERROR'});
			});

	}
	else{
		console.log("Check with Administrator!");
		growl.error("Check with Administrator!", {title: 'EMAIL NOT FOUND'});

	}
// firebaseService.addUser(userVar.email,userVar.password).then(function(userDetails){
			// 	console.log("New User LoggedIn");
			// },function(err){
			// 	if(err.code == "auth/email-already-in-use")
			// 	{
			// 		console.log("Already in use!");
			// 		console.log(userVar);

			// 	}
			// });
	},function(err){console.log(err);});
};




}]);

})();