(function(){

angular.module("absentApp").service("firebaseService",['$q',function($q){

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


    this.getResponse = function(path) {
      return $q(function(resolve, reject) {

      firebase.database().ref(path).once('value', function(snapshot) {
        if(snapshot!=undefined)
        resolve(snapshot.val());
        else
        reject("NullResponse");
      },function(err){
        console.log("Access Denied",err);
        reject("Access Denied");
      });

      });
    };
    this.signIn = function(email,password){
      return firebase.auth().signInWithEmailAndPassword(email, password);

    };

    this.addUser = function(email,password){

          return firebase.auth().createUserWithEmailAndPassword(email, password);

    };

    this.logOut = function(){

          return firebase.auth().signOut();
    };

    this.getCurrentUser = function(){
          return firebase.auth().currentUser;
    };

    this.update = function(path,updates){
      return firebase.database().ref(path).update(updates).then(function(){
          return $q(function(resolve,reject){resolve(path,"UpdateSuccess");});
        },function(err){
          return $q(function(resolve,reject){reject("UpdateFailure",err);  });
        });
    };


}]);

})();