var app = angular.module('myApp', []).factory('newsHandler', function($http){
    
    
    var hackerNews = function(){
        return $http.jsonp('https://www.kimonolabs.com/api/3ohsojdc?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){
               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "Hacker News";
               }
               return data.data.results.all_news;
            });
    };

    var googleNews = function(){
        return $http.jsonp('https://www.kimonolabs.com/api/d2859ucg?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){

               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "Google News";
               }
                return data.data.results.all_news;
            });
    };

    var lifeHacker = function(){
        return $http.jsonp('https://www.kimonolabs.com/api/3jmix9t2?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){

               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "Lifehacker";
               }
                return data.data.results.all_news;
            });
    };

    var gizmodo = function(){
        return $http.jsonp('https://www.kimonolabs.com/api/8mt4om9w?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){

               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "Gizmodo";
               }
                return data.data.results.all_news;
            });
    };

    var cnnTech = function(){
        return $http.jsonp('https://www.kimonolabs.com/api/7j1v7o3i?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){

               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "CNN Tech";
               }
                return data.data.results.all_news;
            });
    };

    var arsTechnica = function(){
        return $http.jsonp('https://www.kimonolabs.com/api/akrnd8po?apikey=DVJ9Ockxnux8SrQBtOKvVYMcmCd2ChQ3&callback=JSON_CALLBACK').then(function(data){

               for(var i = 0; i < data.data.results.all_news.length; i++){
                   data.data.results.all_news[i].src = "Ars Technica";
               }
                return data.data.results.all_news;
            });
    };


    //hackerNews.concat(googleNews, lifeHacker, gizmodo, cnnTech, arsTechnica);
    var functions = [hackerNews, googleNews, lifeHacker, gizmodo, cnnTech, arsTechnica];
    return {functions: functions};
    
    
}).controller('HackerNewsCtrl', function($scope, $http, newsHandler) {

            $scope.hackerNews = [];
            var articles = newsHandler.functions;
            // riding the callback rollercoaster
            articles[0]().then(function(result){
                $scope.hackerNews = result;
                articles[1]().then(function(result){
                    $scope.hackerNews = $scope.hackerNews.concat(result);
                    articles[2]().then(function(result){
                        $scope.hackerNews = $scope.hackerNews.concat(result);
                        articles[3]().then(function(result){
                            $scope.hackerNews = $scope.hackerNews.concat(result);
                            articles[4]().then(function(result){
                                $scope.hackerNews = $scope.hackerNews.concat(result);
                                articles[5]().then(function(result){
                                    $scope.hackerNews = $scope.hackerNews.concat(result);
                                });
                            });
                        });
                    });
                });  
            }); 
        });