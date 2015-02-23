angular.module('rbtv.shows')
    .controller('ShowDetailController', [
        '$scope',
        'shows',
        '$stateParams',
        '$ionicPopup',
        '$window',
        '$http',
        function($scope, shows, $stateParams, $ionicPopup, $window, $http) {

        $scope.loadDisqus = false;
        shows.getByURL($stateParams.show).then(function(show){
            $scope.show =  show;
            var background = tinycolor(show.background);
            $scope.headerColor = background.isDark()? 'light' : 'dark';
            $scope.show.description.replace('(?:\n|\r\n)', '<br />');

            $scope.loadDisqus = true;

            $scope.disqus_identifier = 'show/'+show.url;
            $scope.disqus_url = 'http://rocketbuddy.de/#!/show/'+show.url;
            $scope.disqus_shortname = 'rocketbuddy';
            $scope.disqus_title = show.title;

        }).catch(function(err){
            console.log('could not load shows', err);
            $ionicPopup.alert({
                title: 'Show kann nicht geladen werden',
                template: err.message
            });
        });

        // TODO
        $http.get('https://gdata.youtube.com/feeds/api/playlists/PLsksxTH4pR3LkgjZKgmMlnlGRnn6ElHp0')
        .success(function(result){
            console.log('loaded youtube playlist!', result);
            $scope.playlist = result.feed;

            $scope.pageSize = 5;
            $scope.currentPage = 0;
            $scope.numberOfPages = function(){
                return Math.ceil(result.feed.entry.length/$scope.pageSize);                
            }
        })
        .catch(function(error){
            console.error('error while loading youtube playlist', error);
        });
    }]);