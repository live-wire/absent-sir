(function(){
	angular.module("absentApp").controller("MainCtrl",['$scope','$rootScope','firebaseService','$location','$timeout',function($scope,$rootScope,firebaseService,$location,$timeout){

		$rootScope.$on("CallParentRefreshMethod", function(){
           $scope.refreshLocation();
        });
        $rootScope.$on("CallParentLoginMethod", function(){
           $scope.refreshLocationLogin();
        });

		firebaseService.getFire().auth().onAuthStateChanged(function(user) {

			if (user) {
				console.log(user);
				console.log("^User should be logged in!");
				$rootScope.fetchEmails().then(function(message){
					console.log(message);
					$rootScope.tryLogIn(user,$scope.refreshLocation);
					$scope.initialize();
					},
					function(err){console.log(err);});

		    // User is signed in.
			}
			else {

			console.log($rootScope.userGlobal);
           	$scope.refreshLocationLogin();
		    // No user is signed in.
			}
		});
		$scope.refreshLocation = function(){

			console.log("redirect");

			$location.path('/'+$rootScope.emails[$rootScope.userGlobal.code]);


		};
		$scope.refreshLocationLogin = function(){

			console.log("redirect-login");


			$timeout(function(){$location.path('/login').replace();});


		};

		$scope.initialize = function(){
			$rootScope.$broadcast("loggedIn", {});
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