angular.module('GangstersApp', ['ngRoute', 'firebase'])

	 .run( function($rootScope){
	 	$rootScope.appVersion = '0.1';
	 	$rootScope.laundryCost = 100;	
	 	$rootScope.distilleryCost = 200;	
	 	$rootScope.smugglerCost = 300;	
	 })

	.constant('fbURL', 'https://gangsters.firebaseio.com/')
 
	.factory('Users', function($firebase, fbURL) {
	  return $firebase(new Firebase(fbURL));
	})

	.config(['$locationProvider', function($locationProvider){
            $locationProvider.html5Mode(false); // Removed the #  Hashbang mode
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

	 .controller('MenuCtrl', function($rootScope, $scope, $firebase, fbURL, $location){

	 	$scope.$watch('currentUser', function(newVal, oldVal, scope) { // the newVal of the full_name will be available here
			
	 		// Get the info from the current User and load it

	 		// Could this go into a service?

			if(newVal != undefined && (newVal != oldVal) ){

				var ref = new Firebase(fbURL + "/" + newVal);
		
				$rootScope.me = $firebase(ref);
			}
		});
	 })

	.controller('StatsCtrl', function($scope, $firebase, fbURL){

		// Get all the Gangsters Stats

		var ref = new Firebase(fbURL);
		
		$scope.users = $firebase(ref);
		
	})

	.controller('BuildingsCtrl', function($rootScope, $scope, $firebase, fbURL){

		$rootScope.page = 'buildings';

		$scope.updateBuilding = function(building, scope){

			// I guess we could improve this to avoid 3 hardcoded if statements, will look later

			if( building == 'laundry' ){

				// Does the user has enough money?

				if( $rootScope.laundryCost*$rootScope.me.buildings.laundry < $rootScope.me.money ){

					// Alrigt, update it and upgrade the building

					$rootScope.me.money = $rootScope.me.money - ($rootScope.laundryCost*$rootScope.me.buildings.laundry);
					$rootScope.me.buildings.laundry = $rootScope.me.buildings.laundry + 1;

				}
			}

			if( building == 'distillery' ){

				// Does the user has enough money?

				if( $rootScope.distilleryCost*$rootScope.me.buildings.distillery < $rootScope.me.alcohol ){

					// Alrigt, update it and upgrade the building

					$rootScope.me.alcohol = $rootScope.me.alcohol - ($rootScope.distilleryCost*$rootScope.me.buildings.distillery);
					$rootScope.me.buildings.distillery = $rootScope.me.buildings.distillery + 1;

				}
			}

			if( building == 'smuggler' ){

				// Does the user has enough money?

				if( $rootScope.smugglerCost*$rootScope.me.buildings.smuggler < $rootScope.me.guns ){

					// Alrigt, update it and upgrade the building

					$rootScope.me.guns = $rootScope.me.guns - ($rootScope.smugglerCost*$rootScope.me.buildings.smuggler);
					$rootScope.me.buildings.smuggler = $rootScope.me.buildings.smuggler + 1;

				}
			}

			var ref = new Firebase(fbURL + "/" + $rootScope.me.id);

			/* There's an issue here. How can I update the jSON object without losing data? 
				On my first test I just updated like this:  buildings: {laundry:123}  
				This destroyed distillery and smuggler. It doesn't seem right that I have to re-send 
				the other two values.

				Will do it for now for the sake of the example so I can move forward.
			*/

			ref.update({money : $rootScope.me.money, guns : $rootScope.me.guns, alcohol : $rootScope.me.alcohol, buildings :{ laundry: $rootScope.me.buildings.laundry, distillery: $rootScope.me.buildings.distillery, smuggler: $rootScope.me.buildings.smuggler }});
			
		};
	})

	.controller('MeCtrl', function($scope){

	});