'use strict';

angular.module('GangstersApp.services', [])

	// Interceptor for the authentication, check the $window.sessionStorage.token

	.factory('authInterceptor', function ($rootScope, $q, $window) {
	  return {
	    request: function (config) {
	      config.headers = config.headers || {};
	      if ($window.sessionStorage.token) {
	        config.headers.Authorization = $window.sessionStorage.token;
	      }
	      return config;
	    },
	    response: function (response) {
	      if (response.status === 401) {
	        // handle the case where the user is not authenticated
	        delete $window.sessionStorage.token;
	        $scope.message = "Sesión caducada";
	        $location.path('/');
	      }
	      return response || $q.when(response);
	    }
	  };
	})

	// AuthService is called in the App.js on the $routeChangeStart

	.factory('AuthService', function($window, $http, $rootScope) {

		// We could maybe call the server here to check if the token is still valid?

		return {

			checkToken: function(){
				if ($window.sessionStorage.token){
					//console.log('Token found, thanks! ' + $window.sessionStorage.token);

					// Check against the server

					 $http
				      .post('/backend/validToken')
				      .success(function (data, status, headers, config) {

				      	$rootScope.currentUser = data;

				      	// All good, go on.
				      	return true;
				      })
				      .error(function (data, status, headers, config) {

				        // Erase the token
				        delete $window.sessionStorage.token;
				        return false; // It will redirect the user to the login page
				      });

					return true;
				}else{
					return false;
				}
			}
		}

	});
