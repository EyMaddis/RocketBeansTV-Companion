angular.module('rbtv.home').controller('HomeController', ['$scope', '$state', '$http', function($scope, $state, $http) {
    $http.jsonp('https://api.twitch.tv/kraken/streams/rocketbeansTV?callback=JSON_CALLBACK')
        .success(function(data){
            $scope.twitchStream = data.stream;
        })
        .error(function(err){
            console.error('twich api error',err);
        });


    $scope.watchNow = function(){
        $state.go('rbtv.stream');
    };
}]);