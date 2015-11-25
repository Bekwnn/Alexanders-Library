angular.module('authService', [])

    // FACTORY for login, logout, and getting user info
    .factory('Auth', function($http, $q, AuthToken) {
        var authFactory = {};

        //handle login
        authFactory.login = function(email, password){
            return $http.post('/api/authenticate', {
                email: email,
                password: password
            })
                .success(function(data){
                    AuthToken.setToken(data.token);
                    return data;
                });
        };

        //handle logout
        authFactory.logout = function(){
            AuthToken.setToken(); // clears the token
        };

        //check if a user is logged in
        authFactory.isLoggedIn = function() {
            if(AuthToken.getToken()){
                return true;
            }
            else{
                return false;
            }
        };

        //get user info
        authFactory.getUser = function() {
            if(AuthToken.getToken()){
                return $http.get('/api/me', { cache: true});
            }
            else{
                return $q.reject({ message: 'User has no token.' });
            }
        };

        //return auth factory object
        return authFactory;
    })

    // FACTORY for handling tokens
    .factory('AuthToken', function($window){
        var authTokenFactory = {};
        var token_string = 'token';

        //get token
        authTokenFactory.getToken = function(){
            return $window.localStorage.getItem(token_string);
        };

        // set the token or clear the token
        authTokenFactory.setToken = function(token){
            if(token){
                $window.localStorage.setItem(token_string, token);
            }
            else{
                $window.localStorage.removeItem(token_string);
            }
        };

        return authTokenFactory;
    })

    //app configuration to integrate token requests
    .factory('AuthInterceptor', function($q, $location, AuthToken) {
        var interceptorFactory = {};

        //attach the token to every request
        interceptorFactory.request = function(config){
            var token = AuthToken.getToken();

            if(token){
                config.headers['x-access-token'] = token;
            }

            return config;
        };

        //redirect if a token doesn't authenticate
        interceptorFactory.responseError = function(response){
            if(response.status == 403) {
                AuthToken.setToken();
                $location.path('/login');
            }
            return $q.reject(response);
        };

        return interceptorFactory;
    });