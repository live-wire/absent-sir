(function(){

angular.module("absentApp").service("firebaseService",function(){

	var config = {
    apiKey: "AIzaSyDlXSVBOW9fl96oY4oyTo055jUVd9Y-6dA",
    authDomain: "firetester-b276e.firebaseapp.com",
    databaseURL: "https://firetester-b276e.firebaseio.com",
    storageBucket: "firetester-b276e.appspot.com",
  	};
  	firebase.initializeApp(config);
  this.getFire = function () {
      return firebase;
    };
});


})();