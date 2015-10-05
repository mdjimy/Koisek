(function () {
    var app = angular.module('Route', [
        'ngRoute'
    ]);

    // configure our routes
    app.config(function ($routeProvider) {
            $routeProvider

                    // route for the home page
                    .when('/', {
                        templateUrl: 'pages/login.html'
//                        controller: 'mainController'
                    })

                    // route for the about page
                    .when('/main', {
                        templateUrl: 'pages/main.html'
//                        controller: 'aboutController'
                    });
        }
    );

})();