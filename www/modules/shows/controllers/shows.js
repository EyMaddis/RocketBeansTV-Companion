angular.module('rbtv.shows')
    .controller('ShowsController', ['$scope', 'Restangular', '$state', 'shows', function($scope, restangular, $state, showsService) {
        showsService.list().then(function(shows){
            $scope.shows = shows;
        }).catch(function(err){
            console.log('could not load shows', err);
        });
        $scope.showDetail = function(show){
            $state.go('rbtv.show', {show: show.url});
        };
    }]);