(function(){

angular.module("absentApp").run(['$route', function() {}]);

angular.module("absentApp").run(['$rootScope','$q','firebaseService','$location','$timeout',function($rootScope,$q,firebaseService,$location,$timeout){

	$rootScope.tryLogIn = function(userDetails,callbackFunction){

			console.log("Trying to log in now");
			$rootScope.userGlobal = {};
			$rootScope.userGlobal.email = userDetails.email;
			$rootScope.userGlobal.uid = userDetails.uid;
			$rootScope.userGlobal.code = btoa(userDetails.email);
			$rootScope.userGlobal.access = $rootScope.singleUser.type;
			$rootScope.userGlobal.account = "vitu";
			$rootScope.openPorts();
			$rootScope.init().then(function(note){console.log(note);callbackFunction();},function(err){console.log(err,"ROOTSCOPE INIT FAILED")});
	};
	//Keep adding initialization functions here as promises
	$rootScope.init = function(){
		return $rootScope.fetchEmails().then($rootScope.fetchCourses);
	};

	$rootScope.fetchSingleUser = function(encoded)
	{	console.log("Fetching email",atob(encoded));
		return firebaseService.getResponse("Clients/vitu/emails/"+encoded)
		.then(function(obj){$rootScope.singleUser=obj;return obj;},function(err){return err;});
	};

	$rootScope.fetchEmails = function(){
		console.log("Fetching emails");
		if($rootScope.emails==undefined){
			return firebaseService.getResponse("Clients/vitu/emails")
		.then(
			function(emails)
			{	$rootScope.emails=emails;
				return "Emails Fetch Complete";
			}
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
	$rootScope.fetchCourses = function(note){
		console.log(note,"Fetching courses");
		if($rootScope.courses==undefined){
			return firebaseService.getResponse("Clients/vitu/courses")
		.then(
			function(courses)
			{	$rootScope.courses=courses;
				return "courseFetchComplete";}
			,
			function(err)
			{console.log("FAIL-FETCH-COURSES"+err);
				return err;}
			);
		}
		else
		{

			return $q(function(resolve,reject){
				resolve("Courses Already Fetched");
			});
		}
	};
	$rootScope.openPorts=function(){
		firebaseService.getFire().database().ref("Clients/vitu/emails").on('value', function(snapshot) {
	  		console.log("Updating emails on the FLY");
	  		$rootScope.emails = snapshot.val();
	  		$rootScope.$broadcast("rootScopeUpdated");
		});
		firebaseService.getFire().database().ref("Clients/vitu/courses").on('value', function(snapshot) {
	  		console.log("Updating courses on the FLY");
	  		$rootScope.courses = snapshot.val();
	  		$rootScope.$broadcast("rootScopeUpdated");
		});
	};
	$rootScope.closePorts=function(){
		firebaseService.getFire().database().ref("Clients/vitu/emails").off();
		firebaseService.getFire().database().ref("Clients/vitu/courses").off()
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
			$rootScope.closePorts();
			return "logout success";

		},function(err){return err;});
	};



}]);

})();