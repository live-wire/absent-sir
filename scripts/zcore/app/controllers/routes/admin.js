(function() {
    angular.module("absentApp").controller("AdminCtrl", ['$scope', '$rootScope', '$timeout', 'firebaseService', '$modal', 'ParsedData', 'growl', function($scope, $rootScope, $timeout, firebaseService, $modal, ParsedData, growl) {

        //Don't touch this
        if ($rootScope.isLoggedIn() && $rootScope.userGlobal.access != 'admin') {
            $rootScope.$emit("CallParentRefreshMethod", {});
        } else if (!$rootScope.isLoggedIn()) {
            $rootScope.$emit("CallParentLoginMethod", {});
        } else {
            $scope.init();
        }
        $scope.init = function() {
            $scope.invite = {};
        };

        $scope.inviteIndividual = function() {
            var updates = {};
            var path = 'Classes/';
            var emailEncoded = btoa($scope.invite.emailInput); //check email validation
            console.log($scope.invite);

            updates[emailEncoded + "/type"] = $scope.checked;

            return firebaseService.update(path, updates).then(function() {
                console.log("Email-UPDATED");
                console.log($scope);
                $scope.$apply(function() {
                    // every changes goes here
                    $scope.checked = false;
                    $scope.invite.emailInput = "";
                    growl.success("Person added successfully for Invite", { title: 'SUCCESS' });
                });


            }, function(err) {
                console.log("ERROR-EMAILS-UPLOAD", err);
                growl.error("Person addition failed!", { title: 'FAILURE' });

            });
        }
        $scope.callbackFunction = function(arr) {
            var updates = {};
            console.log(arr);
            var path = 'Classes/';
            angular.forEach(arr, function(value, key) {
                console.log(value[0] + value[1]);
                var emailEncoded = btoa(value[0]);
                updates[emailEncoded + "/type"] = value[1];
            });
            return firebaseService.update(path, updates).then(function() {
                console.log("Emails-UPDATED");
                $scope.$hide();
                growl.success("List added successfully!", { title: 'SUCCESS' });

            }, function(err) {
                console.log("ERROR-EMAILS-UPLOAD", err);
                $scope.$hide();
                growl.error("List addition failed!", { title: 'FAILURE' });

            });
        };
        $scope.parseSelectedFile = function() {
            var file = $scope.myFile;
            console.log('in controller file value is ');
            console.log(file);
            var reader = new FileReader();
            reader.onload = function(e) {
                ParsedData.getArrayFromPath(reader.result, $scope.callbackFunction);
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