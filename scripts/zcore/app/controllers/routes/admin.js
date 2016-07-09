(function(){
angular.module("absentApp").controller("AdminCtrl",['$scope','$rootScope','$timeout','firebaseService','$modal','ParsedData','fileUpload',function($scope,$rootScope,$timeout,firebaseService,$modal,ParsedData,fileUpload){

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

	$scope.callbackFunction = function(arr){
		console.log(JSON.stringify(arr));
	};
	 $scope.uploadFile = function(){
	     var file = $scope.myFile;
		 console.log('in controller file value is ' );
	     console.log(file);
	     var reader = new FileReader();
	     reader.onload = function(e) {
	     	ParsedData.getArrayFromPath(reader.result,$scope.callbackFunction);
	     }

        reader.readAsText(file); 
	     
	     /*var uploadUrl = "upload/";
	     fileUpload.uploadFileToUrl(file, uploadUrl);*/
	  };	
	   /* $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        console.log(file);

        $scope.errFile = errFiles && errFiles[0];
        if (file) {

            file.upload = Upload.upload({
                url: 'http://localhost:8000/upload/',
                data: {file: file},
                headers:{
                	'Access-Control-Allow-Origin': '*',
        			'Access-Control-Allow-Methods': 'POST',
        			'Access-Control-Allow-Headers': "X-Requested-With"
                }


            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    console.log(file.result);
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
     }*/

  

     



}]);

})();