angular.module('rbtv.redditbeans').controller('RedditBeansController', ['$http', '$scope', '$state', function($http, $scope, $state){
    $http.jsonp('https://www.reddit.com/r/rocketbeans.json?jsonp=JSON_CALLBACK')
        .error(function(err){
            console.error('could not load reddit data', err);
        })
        .success(function(data){
            console.log('reddit data loaded', data);
            $scope.posts = data.data;
        });
    $scope.postDetail = function(postId){
        console.log('go to post', postId);
        $state.go('rbtv.redditpost', {post: postId});
    }
}]);