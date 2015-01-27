angular.module('rbtv.stream', ['ui.router'])
    .config(['$stateProvider', function($stateProvider){
        $stateProvider.state('rbtv.stream', {
            url: "/stream",
            views: {
                'menuContent': {
                    templateUrl: "modules/stream/templates/stream.html",
                    controller: 'StreamController'
                }
            }
        });
    }]);