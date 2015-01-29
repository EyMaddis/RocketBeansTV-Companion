angular.module('rbtv.shows')
    .controller('ShowDetailController', ['$scope', 'shows', '$stateParams', '$ionicHistory', function($scope, shows, $stateParams, $ionicHistory) {
        shows.getByURL($stateParams.show).then(function(show){
            $scope.show =  show;
            var background = tinycolor(show.background);
            $scope.headerColor = background.isDark()? 'light' : 'dark';
            $scope.show.description.replace('(?:\n|\r\n)', '<br />');
        }).catch(function(err){
            console.log('could not load shows', err);
        });
        console.log($ionicHistory.currentStateName());
    }]);