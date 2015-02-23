angular.module('rbtv.home', ['ui.router'])
    .config(['$stateProvider', function($stateProvider){
        $stateProvider.state('rbtv.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "modules/home/templates/home.html",
                    controller: "HomeController"
                }
            }
        });
    }]);