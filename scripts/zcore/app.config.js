(function(){

angular.module("absentApp").run(['$route', function() {}]);

angular.module("absentApp").run(['$rootScope','$q','firebaseService','$location','$timeout',function($rootScope,$q,firebaseService,$location,$timeout){

	$rootScope.tryLogIn = function(userDetails,callbackFunction){

			console.log("Trying to log in now");
			$rootScope.userGlobal = {};
			$rootScope.userGlobal.email = userDetails.email;
			$rootScope.userGlobal.uid = userDetails.uid;
			$rootScope.userGlobal.code = btoa(userDetails.email);
			$rootScope.userGlobal.access = $rootScope.emails[$rootScope.userGlobal.code].type;
			$rootScope.userGlobal.account = "vitu";
			callbackFunction();
	};

	//Keep adding initialization functions here as promises
	$rootScope.init = function(){
		return $rootScope.fetchEmails();
	};

	$rootScope.fetchEmails = function(){

		if($rootScope.emails==undefined){
			return firebaseService.getResponse("Clients/vitu/emails")
		.then(
			function(emails)
			{	$rootScope.emails=emails;
				return emails;}
			,
			function(err)
			{console.log("FAIL-FETCH-EMAILS"+err);
				return err;}
			);
		}
		else
		{

			return $q(function(resolve,reject){
				resolve("Emails Already Fetched");
			});
		}
	};






	$rootScope.isLoggedIn = function(){
		if($rootScope.userGlobal == undefined){
			return false;
		}
		else
			return true;

	};

	$rootScope.logOut = function(){
		return firebaseService.logOut().then(function(){
			$rootScope.userGlobal = undefined;
			return "logout success";

		},function(err){return err;});
	};



}]);

})();