(function(){

angular.module("absentApp").run(['$route', function() {}]);
angular.module("absentApp").config(function($mdThemingProvider){

	 $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('blue');

});

angular.module("absentApp").run(['$rootScope','$q','firebaseService','$location','$timeout','growl',function($rootScope,$q,firebaseService,$location,$timeout,growl){
	$rootScope.userGlobal = {};
	if(localStorage.getItem("userGlobal"))
	{
		$rootScope.userGlobal = JSON.parse(localStorage.getItem("userGlobal"));
	}
	$rootScope.tryLogIn = function(userDetails,singleUser,callbackFunction){

			console.log("Trying to log in now");
				$rootScope.userGlobal.email = userDetails.email;
				$rootScope.userGlobal.uid = userDetails.uid;
				$rootScope.userGlobal.code = btoa(userDetails.email);
				$rootScope.userGlobal.access = singleUser.type;
				$rootScope.userGlobal.account = localStorage.getItem("account");
				localStorage.setItem("userGlobal",JSON.stringify($rootScope.userGlobal));
				$rootScope.$broadcast("loggedIn", {});
				callbackFunction();
	};

	//Keep adding initialization functions here as promises
	$rootScope.init = function(){
		return $rootScope.fetchEmails().then($rootScope.fetchCourses);
	};

	$rootScope.fetchSingleUser = function(encoded,account)
	{	console.log("Fetching email",atob(encoded));
		if(localStorage.getItem("singleUser"))
			{
				//return JSON.parse(localStorage.getItem("singleUser"));
			}

		return firebaseService.getResponse("Clients/"+account+"/emails/"+encoded)
		.then(function(obj){if(!obj){throw "NOT FOUND";}$rootScope.singleUser=obj;localStorage.setItem("singleUser",JSON.stringify(obj));return obj;},function(err){return err;});
	};

	$rootScope.fetchEmails = function(){
		console.log("Fetching emails");
		if($rootScope.emails==undefined){
			return firebaseService.getResponse("Clients/vitu/emails")
		.then(
			function(emails)
			{
				$rootScope.emails=emails;
				return $q(function(resolve,reject){
				resolve("Emails Fetched SUCCESS");
				});
			}
			,
			function(err)
			{console.log("FAIL-FETCH-EMAILS"+err);

				return $q(function(resolve,reject){
				reject("Emails fetch FAILURE");
			});
			}
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
				return $q(function(resolve,reject){
				resolve("Courses Fetched - SUCCESS");
			});
			}
			,
			function(err)
			{console.log("FAIL-FETCH-COURSES"+err);
				return $q(function(resolve,reject){
				reject("Courses Fetched - FAILURE");
			});}
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
		firebaseService.getFire().database().ref("Clients/vitu/courses").off();
	};




	$rootScope.isLoggedIn = function(){
		if(!$rootScope.userGlobal.email){
			return false;
		}
		else
			return true;

	};
	if(!$rootScope.isLoggedIn()){
		if($location.search()['account']){
		$rootScope.userGlobal.account = $location.search()['account'];
		}
	}

	$rootScope.logOut = function(){
		return firebaseService.logOut().then(function(){
			$rootScope.userGlobal = {};
			$rootScope.closePorts();
			localStorage.removeItem("account");
			localStorage.removeItem("singleUser");
			localStorage.removeItem("userGlobal");
			return "logout success";

		},function(err){return err;});
	};

	$rootScope.clone=function (obj) {
    	if (null == obj || "object" != typeof obj) return obj;
    	var copy = obj.constructor();
    	for (var attr in obj) {
        	if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    	}
    return copy;
	};

	$rootScope.shallowEquals=function (a, b) {
	    for(var key in a) {
	        if(!(key in b) || a[key] !== b[key]) {
	            return false;
	        }
	    }
	    for(var key in b) {
	        if(!(key in a) || a[key] !== b[key]) {
	            return false;
	        }
	    }
	    return true;
	};



}]);

})();