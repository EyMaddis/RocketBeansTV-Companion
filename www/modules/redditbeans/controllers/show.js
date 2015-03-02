angular.module('rbtv.redditbeans')
    .controller('RedditBeansShowController', [
        '$http',
        '$stateParams',
        '$scope',
        '$sce',
        '$ionicPopup',
        'DSCacheFactory',
        function($http, $stateParams, $scope, $sce, $ionicPopup, DSCacheFactory){
            var url = 'https://www.reddit.com/r/rocketbeans/comments/'+$stateParams.post+'.json?jsonp=JSON_CALLBACK';

            var load = function(){
                $http.jsonp(url)
                    .error(function(err){
                        console.error('Could not load post details', err);
                        $ionicPopup.alert({
                            title: 'Reddit Daten konnten nicht geladen werden',
                            template: err.message
                        });
                    }).success(function(json){
                        console.log('loaded post comments', json);

                        $scope.post = json[0].data.children[0].data;
                        $scope.comments = json[1].data.children;
                        console.log($scope.comments);
                        if($scope.post.url) {
                            $scope.isImage = $scope.post.url.match(/\.(jpeg|jpg|gif|png)$/) != null;
                            $scope.isGifv = $scope.post.url.match(/\.(gifv)/) != null;
                        }
                        if($scope.post.domain === 'youtube.com' || $scope.post.domain === 'youtu.be'){
                            /**
                             * JavaScript function to match (and return) the video Id
                             * of any valid Youtube Url, given as input string.
                             * @author: Stephan Schmitz <eyecatchup@gmail.com>
                             * @url: http://stackoverflow.com/a/10315969/624466
                             */

                            $scope.youtubeURL = $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+getYoutubeID($scope.post.url));
                        }
                    })
                    .finally(function(){
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            };
            load();
            $scope.doRefresh = function(){
                DSCacheFactory.get('defaultCache').remove(url);
                load();
            };
        }]);