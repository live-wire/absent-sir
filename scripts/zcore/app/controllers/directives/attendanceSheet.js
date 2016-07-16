(function(){
angular.module("absentApp").controller("AttendanceSheetCtrl",['$scope','$rootScope','$timeout','firebaseService','growl',function($scope,$rootScope,$timeout,firebaseService,growl){


// Attendance Sheet
$scope.listOfStudents;
$scope.attendanceList;
$scope.listOfDisplayedDates;
$scope.createListOfStudents = function(){
	$scope.listOfStudents = [];
	// get List of students in this class from firebase and set
	$scope.listOfStudents = ['Sangam','Dhruv','Kanav'];
};

$scope.startDate = null;
$scope.endDate = null;


$scope.setDisplayDateList = function(){

// Set Display dates according to startDate and End Date
	$scope.listOfDisplayedDates = ['12th April 2016', '13th April 2016', '14th April 2016', '15th April 2016', '16th April 2016', '17th April 2016', '18th April 2016', '19th April 2016', '20th April 2016', '21th April 2016', '22th April 2016', '23th April 2016', '24th April 2016', '25th April 2016', '26th April 2016', '27th April 2016', '28th April 2016', '29th April 2016', '30th April 2016'];
};

$scope.getAttendanceList = function(){
	//Get  Attendance  for this class from firebase
	$scope.attendanceList = { '12th April 2016' : { 'Sangam' : 'P', 'Dhruv' : 'A' ,  'Kanav' : 'P' , 'Pulkit' : 'P' , 'Hussain' : 'P'} , '13th April 2016' : { 'Sangam' : 'P', 'Dhruv' : 'P' ,  'Kanav' : 'A' , 'Pulkit' : 'A' , 'Hussain' : 'A'} };
	$scope.setDisplayDateList();
};

$scope.takeNewAttendance = function(){
	// 12th April 2016 will be replaced by Sysdate and List of displayed Dates will be updated with only sysdate
	$scope.attendanceList = {};
	$scope.listOfDisplayedDates = ['12th April 2016'];
};



$scope.setAttendance = function(obj){
	if(!$scope.attendanceList[obj.eachDate])
	{
		$scope.attendanceList[obj.eachDate] = {};
	}
	$scope.attendanceList[obj.eachDate][obj.eachStudent] = obj.attendance;
}

$scope.saveAttendance = function(){
//take the date attendance object of this class from attendace list and PUT request
}

$scope.createListOfStudents();
$scope.getAttendanceList();

}]);

})();