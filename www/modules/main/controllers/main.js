angular.module('rbtv.main')
    .controller('AppController', ['$scope', '$ionicModal', '$timeout', 'loginTemplate', '$state', function($scope, $ionicModal, $timeout, loginTemplate, $state) {
        // Form data for the login modal
        $scope.loginData = {};

        $scope.$state = $state;
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl(loginTemplate, {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };

        $scope.menuItems = [
            {state: 'rbtv.home', label: 'Jetzt gerade'},
            {state: 'rbtv.stream', label: 'Livestream'},
            {state: 'rbtv.shows', label: 'Shows'},
            {state: 'rbtv.schedule', label: 'Sendeplan'},
            {state: 'rbtv.redditbeans', label: 'Redditbeans'},
            {state: 'rbtv.support', label: 'Support'},
            {state: 'rbtv.impressum', label: 'App-Info'}
        ];

    }]);