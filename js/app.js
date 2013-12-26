angular.module('GangstersApp', ['ngRoute', 'firebase'])

	// .run( function($rootScope){
	// 	$rootScope.appVersion = '0.1';	
	// })

	.value('fbURL', 'https://gangsters.firebaseio.com/')
 
	.factory('Users', function($firebase, fbURL) {
	  return $firebase(new Firebase(fbURL));
	})

	.controller('MainCtrl', function($scope, $firebase, fbURL){


		var ref = new Firebase(fbURL);
		
		$scope.users = $firebase(ref);

		// Simple Login

		var auth = new FirebaseSimpleLogin(ref, function(error, user) {
		  if (error) {
		    // an error occurred while attempting login
		    console.log(error);
		  } else if (user) {
		    // user authenticated with Firebase
		    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
		  } else {
		    // user is logged out
		  }
		});

	});