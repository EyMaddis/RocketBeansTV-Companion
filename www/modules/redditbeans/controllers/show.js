angular.module('rbtv.redditbeans').controller('RedditBeansShowController', ['$http', '$stateParams', '$scope', '$sce', '$ionicPopup', function($http, $stateParams, $scope, $sce, $ionicPopup){
    console.log('post controller');
    $http.jsonp('https://www.reddit.com/r/rocketbeans/comments/'+$stateParams.post+'.json?jsonp=JSON_CALLBACK')
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
                var getYoutubeID = function (url) {
                    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                    return (url.match(p)) ? RegExp.$1 : false;
                }
                $scope.youtubeURL = $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+getYoutubeID($scope.post.url));
            }
        });
}]);