(function(){
angular.module("absentApp").controller("LoginCtrl",['$scope','$rootScope','firebaseService','$q','$location','growl',function($scope,$rootScope,firebaseService,$q,$location,growl){

if($rootScope.isLoggedIn())
{
	$rootScope.$emit("CallParentRefreshMethod", {});
}
$scope.isSignUpHidden = true;
$scope.isLogInHidden = false;
$scope.signIn=function(userVar)
{
		firebaseService.signIn(userVar.email,userVar.password).then(function(){
						console.log("LoggedIn");
					},function(err){
						console.log(err);
						growl.error(err.message, {title: 'ERROR'});
			});
};
$scope.signUp = function(userVar)
{
 if(!$scope.signupForm.$valid)
 	{
 		growl.warning("All the fields are mandatory.", {title: 'SignUp Warning'});
 	}
 	else{


	 	var encoded = btoa(userVar.email);
		$rootScope.fetchSingleUser(encoded).then(function(obj){
		console.log(obj);
		if(obj){
			//promise chain -- functions defined below
			addUser().then(updateGroups).then(updateUserRecords).then(updateEmails).then(function(message){
				console.log(message);
				growl.success("USER Creation Success");
				$rootScope.logOut();
				$rootScope.inProgress = false;
				$scope.signIn(userVar);

			},function(message){
					var user = firebaseService.getCurrentUser();
					if(user){
					user.delete().then(function() {
					  // User deleted.
					}, function(error) {
  						// An error happened.
					});
					}
				console.log("message");
				growl.error("Please retry in some time.",{title:"FAILED"});});


			function addUser(){
				$rootScope.inProgress = true;
				console.log(" CreatingUser ");
				return firebaseService.addUser(userVar.email,userVar.password).then(function(userDetails){
					console.log("New User LoggedIn",userDetails);
					userVar.uid = userDetails.uid;
					userVar.type = obj.type;
					//$rootScope.logOut();
					return $q(function(resolve,reject){
						resolve("UserCreationSuccess");
					});

				},function(err){
					if(err.code == "auth/email-already-in-use")
					{

						console.log("Already in use!",userVar);
						growl.error("Try Logging in!", {title: 'USER ALREADY SIGNED UP'});

					}
					return $q(function(resolve,reject){
						reject("UserCreationFailed",err);
					});
				});
			}
			function updateGroups(message){
				var updates = {};
  				updates[userVar.uid] = true;
  				var path = 'Clients/vitu/groups/'+userVar.type;
				return firebaseService.update(path,updates);
			}

			function updateUserRecords(message){
				var updates = {};
				updates[userVar.uid+"/name"]=userVar.name;
				updates[userVar.uid+"/address"]=userVar.address;
				updates[userVar.uid+"/contact"]=userVar.phone;
				updates[userVar.uid+"/email"]=userVar.email;
				updates[userVar.uid+"/id"]=userVar.id;
				var path = 'Clients/vitu/'+userVar.type+'s/';
				return firebaseService.update(path,updates);
			}
			function updateEmails(message){
				var emailEncoded = btoa(userVar.email);
				var updates = {};
				updates[emailEncoded+"/name"]=userVar.name;
				updates[emailEncoded+"/id"]=userVar.id;
				updates[emailEncoded+"/uid"]=userVar.uid;
				var path = 'Clients/vitu/emails/';
				return firebaseService.update(path,updates);
			}

		}
		else{
			growl.error("Check with Administrator!", {title: 'EMAIL NOT FOUND'});

		}
		},function(err){console.log(err);});

 	}
};






}]);

})();