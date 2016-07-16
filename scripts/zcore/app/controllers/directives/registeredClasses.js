(function() {
	angular.module("absentApp").directive('registeredClasses', function() {
		return {
			restrict: 'A',
			transclude: true,
			templateUrl: '/views/directives/registered-classes.html',
			scope: {
				listOfClasses: '=',
				divTitle: '='
			}
		};
	});
})();