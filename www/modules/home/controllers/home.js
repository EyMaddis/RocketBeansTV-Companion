angular.module('rbtv.home').controller('HomeController', ['$scope', '$state', '$http', function($scope, $state, $http) {
    $http.jsonp('https://api.twitch.tv/kraken/streams/rocketbeansTV?callback=JSON_CALLBACK')
        .success(function(data){
            $scope.twitchStream = data.stream;
            twttr.widgets.load();
        })
        .error(function(err){
            twttr.widgets.load(); // TODO
            console.error('twich api error',err);
        });

    $scope.watchNow = function(){
        $state.go('rbtv.stream');
    };

}]);