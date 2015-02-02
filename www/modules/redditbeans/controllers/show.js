angular.module('rbtv.redditbeans').controller('RedditBeansShowController', ['$http', '$stateParams', function($http, $stateParams){
    console.log('post controller');
    $http.jsonp('https://www.reddit.com/r/rocketbeans/comments/'+$stateParams.post+'.json?jsonp=JSON_CALLBACK')
        .error(function(err){
           console.error('Could not load post details', err);
        }).success(function(data){
            console.log('loaded post comments', data);
            $scope.post = data.data;
        });
}]);