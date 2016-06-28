(function(){
angular.module("absentApp").controller("LoginCtrl",['$scope','$rootScope','firebaseService','$q','$location',function($scope,$rootScope,firebaseService,$q,$location){

if($rootScope.isLoggedIn())
{
	$rootScope.$emit("CallParentRefreshMethod", {});
}
$scope.addUser=function(userVar)
{
	$rootScope.fetchEmails().then(function(note){
	console.log(note);
	var encoded = btoa(userVar.email);
	console.log(encoded);
	if($rootScope.emails[encoded] == undefined)
	{
		console.log("Check with Administrator!");
	}
	else
	{
		firebaseService.addUser(userVar.email,userVar.password).then(function(userDetails){
			console.log("New User LoggedIn");
		},function(err){
			if(err.code == "auth/email-already-in-use")
			{
				console.log("Already in use!");
				console.log(userVar);
				firebaseService.signIn(userVar.email,userVar.password).then(function(){
					console.log("LoggedIn");
				},function(err){console.log(err);});
			}
		});
	}

	},function(err){console.log(err);});

};




}]);

})();