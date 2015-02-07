angular.module('rbtv.redditbeans').controller('RedditBeansController', ['$http', '$scope', '$state', 'DSCacheFactory', function($http, $scope, $state, DSCacheFactory){
    var url = 'https://www.reddit.com/r/rocketbeans.json?jsonp=JSON_CALLBACK';
    var load = function(){
        $http.jsonp(url)
            .error(function(err){
                console.error('could not load reddit data', err);
            })
            .success(function(data){
                console.log('reddit data loaded', data);
                $scope.posts = data.data;
            })
            .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        $scope.postDetail = function(postId){
            console.log('go to post', postId);
            $state.go('rbtv.redditpost', {post: postId});
        }
    };
    load();
    $scope.doRefresh = function(){
        DSCacheFactory.get('defaultCache').remove(url);
        load();
    };

}]);