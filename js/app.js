angular.module('GangstersApp', ['ngRoute', 'firebase'])

	 .run( function($rootScope){
	 	$rootScope.appVersion = '0.1';	
	 })

	.value('fbURL', 'https://gangsters.firebaseio.com/')
 
	.factory('Users', function($firebase, fbURL) {
	  return $firebase(new Firebase(fbURL));
	})

	.config(['$locationProvider', function($locationProvider){
            $locationProvider.html5Mode(true); // Removed the #  Hashbang mode
    }])

    // Build up the routes

	 .config(['$routeProvider', function($routeProvider){
                
                $routeProvider

                		.when('/', {
                			templateUrl: '/views/global-stats.html',
                			controller: 'StatsCtrl'
                		})

                		.when('/me', {
                			templateUrl: '/views/me.html',
                			controller: 'MeCtrl'
                		})

                        .when("/buildings/", {
                                templateUrl: '/views/buildings.html',
                                controller: 'BuildingsCtrl'
                        })
                        
                        .otherwise({
                                redirectTo: '/'
                        });
        }])

	 .controller('MainCtrl', function($scope){

	 })

	 .controller('MenuCtrl', function($scope, $firebase, fbURL){

	 	$scope.$watch('currentUser', function(newVal, oldVal, scope) { // the newVal of the full_name will be available here
			
	 		// Get the info from the current User and load it

			if(newVal != undefined && (newVal != oldVal) ){

				var ref = new Firebase(fbURL + "/" + newVal);
		
				$scope.me = $firebase(ref);

				var data = $scope.me;

				var buildings = data.buildings;
				console.log(buildings);
			}
		});
	 })

	.controller('StatsCtrl', function($scope, $firebase, fbURL){

		// Get all the Gangsters Stats

		var ref = new Firebase(fbURL);
		
		$scope.users = $firebase(ref);
		
	})

	.controller('BuildingsCtrl', function($scope){

	})

	.controller('MeCtrl', function($scope){

	});