(function(){
	angular.module("absentApp").controller("MainCtrl",['$scope','$rootScope','firebaseService','$location','$timeout','growl',function($scope,$rootScope,firebaseService,$location,$timeout,growl){

		$rootScope.$on("CallParentRefreshMethod", function(){
           $scope.refreshLocation();
        });
        $rootScope.$on("CallParentLoginMethod", function(){
           $scope.refreshLocationLogin();
        });
        $scope.refreshLocation = function(){

			console.log("redirect",$rootScope.emails);

			$location.path('/'+$rootScope.userGlobal.access);


		};

		firebaseService.getFire().auth().onAuthStateChanged(function(user) {
			if (user) {
				if($rootScope.inProgress){}
					else{
				console.log(user);
				console.log("^User should be logged in!");
				var account = localStorage.getItem("account");
				$rootScope.fetchSingleUser(btoa(user.email),account).then(function(obj){
					console.log("SingleUser",obj);
					if(obj){
					$rootScope.tryLogIn(user,obj,$scope.refreshLocation);
					}
					},
					function(err){growl.error(err, {title: 'ERROR'});});
					}

		    // User is signed in.
			}
			else {

			console.log($rootScope.userGlobal);
           	$scope.refreshLocationLogin();
		    // No user is signed in.
			}
		});
		$scope.refreshLocationLogin = function(){

			console.log("redirect-login");


			$timeout(function(){$location.path('/login').replace();});


		};

		$scope.yo = "You can't see me! My time is now!";


		$scope.fetchFromDb=function(){
		// 	firebaseService.getFire().database().ref('Clients/vitu/name').on('value', function(snapshot) {

  // 			$scope.$apply(function() {
  //   			$scope.account = snapshot.val();
		// 	});
		// });




		};

		$scope.update = function(value){

		};


	}]);

}
)();