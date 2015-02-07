angular.module('rbtv.home').controller('HomeController', ['$scope', '$state', '$http', 'DSCacheFactory', function($scope, $state, $http, DSCacheFactory) {
    var url = 'https://api.twitch.tv/kraken/streams/rocketbeansTV?callback=JSON_CALLBACK';
    var load = function(){
        $http.jsonp(url)
            .success(function(data){
                $scope.twitchStream = data.stream;
            })
            .error(function(err){
                console.error('twich api error',err);
            })
            .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
                twttr.widgets.load();
            });

    };

    load();
    $scope.doRefresh = function(){
        DSCacheFactory.get('defaultCache').remove(url);
        load();
    };


    $scope.watchNow = function(){
        $state.go('rbtv.stream');
    };

}]);