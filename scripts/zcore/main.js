(function(){
	angular.module("absentApp").controller("MainCtrl",['$scope','firebaseService',function($scope,firebaseService){
		$scope.initialize = function()
		{

		};

		$scope.yo = "You can't see me! My time is now!";
		$scope.role = "Teacher";
		$scope.account = "----";

		$scope.fetchFromDb=function(){
			firebaseService.getFire().database().ref('Univ/id').on('value', function(snapshot) {

  			$scope.$apply(function() {
    			$scope.account = snapshot.val();
			});
		});

			firebaseService.getFire().database().ref('Univ/emails/c3R1ZGVudDFAZ21haWwuY29t').on('value', function(snapshot) {
				console.log("AccessRole Fetched");

  			$scope.$apply(function() {
    			$scope.role = snapshot.val();
			});
		});


		};

		$scope.update = function(value){

		};


	}]);

}
)();