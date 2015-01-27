angular.module('rbtv.schedule', ['restangular','ui.router'])
.config(['$stateProvider', function($stateProvider){
        $stateProvider.state('rbtv.schedule', {
            url: "/schedule",
            views: {
                'menuContent': {
                    templateUrl: "modules/schedule/templates/schedule.html",
                    controller: 'ScheduleController'
                }
            }
        })
    }]);