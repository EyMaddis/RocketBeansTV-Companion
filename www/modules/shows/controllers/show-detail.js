angular.module('rbtv.shows')
    .controller('ShowDetailController', [
        '$scope',
        'shows',
        '$stateParams',
        '$ionicPopup',
        '$window',
        '$http',
        '$q',
        function($scope, shows, $stateParams, $ionicPopup, $window, $http, $q) {

        $scope.loadDisqus = false;
        $scope.loadingPlaylists = true;
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

            var playlistURL = 'https://gdata.youtube.com/feeds/api/playlists/';
            var playlistsPromises = [];
            console.log(show);
            if(!show.playlistIds) return;
            console.log('loading videos');
            show.playlistIds.forEach(function(playlistId){
                playlistsPromises.push($http.get(playlistURL+playlistId));
            });
            
            $q.all(playlistsPromises)
                .then(function(results){
                    $scope.loadingPlaylists = false;

                    console.log('loaded youtube playlists!', results);
                    $scope.playlists = [];
                    results.forEach(function(result){
                        var feed = result.data.feed;
                        $scope.playlists.push(feed);

                        // single entries are interpreted as object in x2js
                        if(Object.prototype.toString.call(feed.entry) === '[object Object]')
                            feed.entry = [feed.entry];
                    });
                    if($scope.playlists.length === 1) 
                        $scope.setPlaylist($scope.playlists[0]);
                    $scope.pageSize = 5;
                    $scope.currentPage = 0;
                    $scope.numberOfPages = function(){
                        if(!$scope.playlist) return 0;
                        return Math.ceil($scope.playlist.entry.length/$scope.pageSize);                
                    };
                })
                .catch(function(error){
                    console.error('error while loading youtube playlist', error);
                    $scope.loadingPlaylists = false;
                });
        }).catch(function(err){
            console.error('could not load shows', err);
            $ionicPopup.alert({
                title: 'Show kann nicht geladen werden',
                template: err.message
            });
        });

        $scope.setPlaylist = function(playlist){
            $scope.playlist = playlist;
        }

        
    }]);