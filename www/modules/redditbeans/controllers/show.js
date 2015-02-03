angular.module('rbtv.redditbeans').controller('RedditBeansShowController', ['$http', '$stateParams', '$scope', function($http, $stateParams, $scope){
    console.log('post controller');
    $http.jsonp('https://www.reddit.com/r/rocketbeans/comments/'+$stateParams.post+'.json?jsonp=JSON_CALLBACK')
        .error(function(err){
           console.error('Could not load post details', err);
        }).success(function(json){
            console.log('loaded post comments', json);

            $scope.post = json[0].data.children[0].data;
            $scope.comments = json[1].data.children;
        });
}]);