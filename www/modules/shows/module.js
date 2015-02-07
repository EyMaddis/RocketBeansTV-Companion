angular.module('rbtv.shows', ['restangular','ui.router', 'ionic']).config(['$stateProvider', '$provide', function($stateProvider, $provide){
    $stateProvider
        .state('rbtv.shows', {
            url: "/shows",
            views: {
                'menuContent': {
                    templateUrl: 'modules/shows/templates/shows.html',
                    controller: 'ShowsController'
                }
            }
        })
        .state('rbtv.show', {
            url: "/show/:show",
            cache: false, //disqus
            views: {
                'menuContent': {
                    templateUrl: 'modules/shows/templates/show-detail.html',
                    controller: 'ShowDetailController'
                }
            }
        });
    }])
    .value('imageBaseURL', 'http://192.168.178.25:3001/images/show-logos/') //TODO
    .factory('shows', ['Restangular', function(restangular){

        var cache;
        var waiting = [];
        restangular.all('shows').getList().then(function(shows){
            cache = shows;
            console.log('show cache renewed.');
            waiting.forEach(function(item){item(shows)});
        });

        var list = function (){
            return new Promise(function(resolve, reject){
                if(cache){
                    return resolve(cache);
                } else {
                    waiting.push(resolve);
                }
            });
        }

        var getByURL = function(url){
            return new Promise(function(resolve, reject){
                list().then(function(shows){
                    resolve(_.find(shows, function(show){
                        return show.url === url;
                    }));
                });

            })
        };

        return {
            list: list,
            getByURL: getByURL
        }
    }]);