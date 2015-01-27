angular.module('rbtv.main', ['ui.router'])
    .config(['$provide', '$stateProvider', function($provide, $stateProvider){
        $stateProvider.state('rbtv', {
            url: "",
            abstract: true,
            templateUrl: "modules/main/templates/menu.html",
            controller: 'AppController'
        });

        $provide.value('loginTemplate', 'modules/main/templates/login.html');
    }]);