function setStyle(obj){
    
    obj.style.color = "#F88017";
}
var app = angular.module('myApp', ['LocalStorageModule']).factory('newsHandler', function($http){
    
    var sources = [
        {name: 'Hacker News', 
         api: '3ohsojdc'},
        {name: 'Google News', 
         api: 'd2859ucg'},
        {name: 'Lifehacker',  
         api: '3jmix9t2'},
        {name: 'Gizmodo',     
         api: '8mt4om9w'},
        {name: 'CNN Tech',    
         api: '7j1v7o3i'},
        {name: 'Ars Technica',
         api: 'akrnd8po'},
        {name: 'CNET', 
         api: '60kmt1ti'},
        {name: 'Macworld', 
         api: '5pmozpf4'},
        {name: 'The Verge',
         api: 'dov3wv56'},
        {name: 'TechCrunch',
         api: '8ufy858c'},
        {name: 'MIT Technology Review',
         api: '86i92cgo'},
        {name: 'Naked Security',
         api: '28nffk16'},
        {name: 'Reuters',
         api: '278a9wes'}
    ];
    
    // public key
    var apiKey = 'DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3';
    var functions = [];
    for(var i = 0; i < sources.length; i++){
        
        
        var api = sources[i].api;
        
        var name = sources[i].name;
        
        var sourceFunc = function(api, name, apiKey) {
            return $http.jsonp('https://www.kimonolabs.com/api/' + api + '?apikey=' + apiKey +   '&callback=JSON_CALLBACK').then(function(data){
            
               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = name;
               }
               return data.data.results.all_news;
            });
            
        };
        
        functions.push(sourceFunc(api, name, apiKey));
    }
    
    return {functions: functions, sources: sources};
    
}).controller('HackerNewsCtrl', function($scope, $http, newsHandler, localStorageService) {
            $scope.notfav = function(key){
                if(localStorageService.get(key) != undefined){
                    return false;
                }
                return true;
            }
            var addFavorite = function(url, title, src){
                localStorageService.set(url, {title: title, src: src });
                $scope.numFav = localStorageService.keys().length;
            }
            
            $scope.favorite = addFavorite;
            
            $scope.numFav = localStorageService.keys().length;
    
            $scope.hackerNews = [];
            var articles = newsHandler.functions;
    
            $scope.sources = newsHandler.sources;
            
            // The below code does essentially nested callbacks
            articles.forEach(function(callback){
                callback.then(function(result){
                    $scope.hackerNews = $scope.hackerNews.concat(result);
                    $scope.hackerNews.sort(function(first, second){
                        
                        return first.news_headline.text.localeCompare(second.news_headline.text);
                    });
                });
            });
    
            // EDIT: The code below is before i learned about forEach
            // riding the callback rollercoaster 
            /*
            articles[0]().then(function(result){
                $scope.hackerNews = result;
                articles[1]().then(function(result){
                    $scope.hackerNews = $scope.hackerNews.concat(result);
                    articles[2]().then(function(result){
                        $scope.hackerNews = $scope.hackerNews.concat(result);
                        articles[3]().then(function(result){
                   .... AND SO ON AND SO FORTH
                   
            */
        }).controller('FavoritesCtrl', function($scope, $http, newsHandler, localStorageService) {
    
            var updateFavs = function() {
                
                var keys = localStorageService.keys();
                $scope.favorites = [];

                for(var i = 0; i < keys.length; i++){
                    var data = localStorageService.get(keys[i]);
                    var favorite = {
                        url: keys[i],
                        title: data.title,
                        src: data.src  
                    };
                    $scope.favorites.push(favorite);
                }
            }
            
            $scope.update = updateFavs;
            $scope.remove = function(key, callback){
                new Audio('delete.mp3').play();
                localStorageService.remove(key);
                callback();
            }
            var clearFavorites = function(){
                new Audio('delete.mp3').play();
                $scope.favorites = [];
                localStorageService.clearAll();
                
            }
            $scope.clear = clearFavorites;
    
            updateFavs();
    
        }).filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);