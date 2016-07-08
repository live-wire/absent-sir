(function(){
angular.module("absentApp").controller("AllStudentsCtrl",['$scope','$rootScope','$timeout','firebaseService','growl',function($scope,$rootScope,$timeout,firebaseService,growl){

$rootScope.$on("loggedIn", function(){
           $scope.init();
        });


	//$scope.popover={title:"Yahooo",content:"CONTENTTT"};
	//title="{{student.id}}" data-content="{{student.name}}" data-template-url="views/popover/popover.tpl.html" data-animation="am-flip-x" data-placement="left" data-auto-close="1" bs-popover

	$scope.init =function(){
		//$scope.students = $scope.fetchStudents();
	};

	$scope.studentDetails = function(id){
		console.log(id);
	};

	//THIS CODE IS TO MAKE ALL_STUDENTS DIRECTIVE WORK -- -- --
	//-----------------------DIRECTIVE------------------------------
	$scope.isCoursesCollapsed = false;
	$scope.isisAllStudentsCollapsed = false;
	$rootScope.$on("rootScopeUpdated", function(){
    	$timeout(function(){$scope.refresh();});
	});
	$scope.refresh = function(){
	$scope.students = (function fetchStudents(){
		var tempArr = [];
		for (var prop in $rootScope.emails) {
		    if ($rootScope.emails.hasOwnProperty(prop)) {
		         if($rootScope.emails[prop].type=='student' || $rootScope.emails[prop].type=='teacher')
		         	{
		         		var obj = $rootScope.emails[prop];
		         		obj.email = atob(prop);
		         		obj.type = $rootScope.emails[prop].type;
		         		tempArr.push(obj);

		         	}
		    	}
			}
			return tempArr;

	})();
	$scope.coursesLocal = (function fetchCourses(){
		var tempArr = [];
		for (var prop in $rootScope.courses) {
		    if ($rootScope.courses.hasOwnProperty(prop)) {

		         		var obj = $rootScope.courses[prop];
		         		obj.id = prop;
		         		tempArr.push(obj);


		    	}
			}
			return tempArr;

	})();
	};
	$scope.refresh();



	$scope.selectedStudent = {};
	$scope.selectedClass = {};

	$scope.selectStudent = function(uid,type){
		if(type=='student'){
		firebaseService.getResponse("Clients/vitu/students/"+uid).then(function(student){
			if(student==null){student={};}
			student.type='student';
			$scope.selectedStudent = student;
			console.log("StudentSelected",student);

			},function(err){growl.error(err.message,{title:'ERROR'})});
		}
		else{
		firebaseService.getResponse("Clients/vitu/teachers/"+uid).then(function(teacher){
			if(teacher == null){teacher={};}
			teacher.type='teacher';
			$scope.selectedStudent = teacher;
			console.log("TeacherSelected",teacher);
			},function(err){growl.error(err.message,{title:'ERROR'})});
		}
	};
	$scope.selectNewClass = function(classCode){

		$scope.selectedClass = {};
		firebaseService.getResponse("Clients/vitu/classes/"+classCode).then(function(classVar){
			if(classVar){
			firebaseService.getResponse("Clients/vitu/teachers/"+classVar.teacher+"/name").then(function(name){

			$scope.selectedClass = classVar;
			$scope.selectedClass.teacherName = name;
			$scope.selectedClass.id = classCode;
			console.log("ClassSelected",$scope.selectedClass);
			});
		}
		else
		{
			$scope.selectedClass = {error:'Not Found'};
			//growl.error("Class "+classCode+" Not Found!",{title:'ERROR'});
		}

		},function(err){growl.error(err.message,{title:'ERROR'});});

	};
	//-----------------------------DIRECTIVE-------------------------------------







}]);

})();