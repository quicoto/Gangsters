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

	 .config(['$routeProvider', function($routeProvider){
                
                $routeProvider

                		.when('/', {
                			templateUrl: '/views/global-stats.html',
                			controller: 'StatsCtrl'
                		})

                        .when("/buildings/", {
                                templateUrl: '/views/buildings.html',
                                controller: 'BuildingsCtrl'
                        })
                        
                        .otherwise({
                                redirectTo: '/'
                        });
        }])

	.controller('StatsCtrl', function($scope, $firebase, fbURL){


		var ref = new Firebase(fbURL);
		
		$scope.users = $firebase(ref);
		
	})

	.controller('BuildingsCtrl', function($scope){

	});